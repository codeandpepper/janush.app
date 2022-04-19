import { Construct } from "constructs";
import * as path from "path";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { CfnOutput } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

interface Props {
  userPool: IUserPool;
}

export class CognitoAppsyncConstruct extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const api = new appsync.GraphqlApi(this, "CognitoAppsyncApp", {
      name: "CognitoAppsyncApi",
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, "graphql/schema.graphql")
      ),
      // authorizationConfig: {
      //   defaultAuthorization: {
      //     authorizationType: appsync.AuthorizationType.USER_POOL,
      //     userPoolConfig: {
      //       userPool: props.userPool,
      //     },
      //   },
      // },
      xrayEnabled: true,
    });

    new CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl || "",
    });

    // new CfnOutput(this, "GraphQLAPIKey", {
    //   value: api.apiKey || "",
    // });

    const listUsersLambda = new lambda.Function(this, "ListUsersLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda/listUsers")),
      handler: "listUsers.main",
      environment: {
        USER_POOL_ID: props.userPool.userPoolId,
      },
      memorySize: 1024,
      initialPolicy: [
        new iam.PolicyStatement({
          actions: ["cognito-idp:ListUsers"],
          effect: iam.Effect.ALLOW,
          resources: [props.userPool.userPoolArn],
        }),
      ],
    });

    const lambdaDs = api.addLambdaDataSource(
      "lambdaDatasource",
      listUsersLambda
    );

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listUsers",
    });
  }
}
