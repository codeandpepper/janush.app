import { Construct } from "constructs";
import { EnvName } from "@enums/EnvName";
import * as appSync from "@aws-cdk/aws-appsync-alpha";
import {
  aws_iam as iam,
  aws_lambda_nodejs as lambda,
  aws_cognito as cognito,
  StackProps,
} from "aws-cdk-lib";
import { DEFAULT_LAMBDA_RUNTIME } from "../../../consts/index";
import * as path from "path";

interface GetUserGroupsProps {
  envName: EnvName;
  userPool: cognito.UserPool;
  graphQlApi: appSync.GraphqlApi;
}

export class GetUserGroupsCdkConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { envName, userPool, graphQlApi }: StackProps & GetUserGroupsProps
  ) {
    super(scope, id);

    const getGroupLambda = new lambda.NodejsFunction(
      this,
      `${envName}-GetUserGroup`,
      {
        runtime: DEFAULT_LAMBDA_RUNTIME,
        entry: path.join(__dirname, "./getUserGroupsLambda.ts"),
        environment: {
          REGION: (process.env.CDK_DEFAULT_REGION ?? process.env.AWS_REGION)!,
          USER_POOL_ID: userPool.userPoolId,
        },
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["cognito-idp:ListGroups"],
            effect: iam.Effect.ALLOW,
            resources: [userPool.userPoolArn],
          }),
        ],
      }
    );

    const getGroupDataSource = graphQlApi.addLambdaDataSource(
      `${envName}-GetGroupDataSource`,
      getGroupLambda
    );

    getGroupDataSource.createResolver({
      typeName: "Query",
      fieldName: "allUserGroups",
    });
  }
}
