import { Construct } from "constructs";
import * as path from "path";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { CfnOutput } from "aws-cdk-lib";

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
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
      },
    });

    new CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl || "",
    });

    new CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    const userLambda = new lambda.Function(this, "AppSyncUserHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda")),
      memorySize: 1024,
    });

    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", userLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listUsers",
    });
  }
}
