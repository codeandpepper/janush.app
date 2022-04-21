import {
  aws_appsync as appSync,
  StackProps,
  aws_cognito as cognito,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { EnvName } from "@enums/EnvName";

interface AppSyncProps {
  envName: EnvName;
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
}

export class AppSyncCdkConstruct extends Construct {
  public api: appSync.CfnGraphQLApi;
  constructor(
    scope: Construct,
    id: string,
    { envName, userPool, userPoolClient }: StackProps & AppSyncProps
  ) {
    super(scope, id);

    const appSyncName = `${envName}-AppSyncApi`;

    this.api = new appSync.CfnGraphQLApi(this, appSyncName, {
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      name: appSyncName,
      userPoolConfig: {
        appIdClientRegex: userPoolClient.userPoolClientId,
        awsRegion: process.env.CDK_DEFAULT_REGION,
        defaultAction: "ALLOW",
        userPoolId: userPool.userPoolId,
      },
    });
  }
}