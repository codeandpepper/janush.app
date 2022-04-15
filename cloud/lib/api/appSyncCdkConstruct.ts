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

    this.api = new appSync.CfnGraphQLApi(this, `${envName}-AppSyncApi`, {
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      name: `${envName}-AppSyncApi`,
      additionalAuthenticationProviders: [
        {
          authenticationType: "AMAZON_COGNITO_USER_POOLS",
          userPoolConfig: {
            appIdClientRegex: userPoolClient.userPoolClientId,
            awsRegion: process.env.CDK_DEFAULT_ACCOUNT,
            userPoolId: userPool.userPoolId,
          },
        },
      ],
      userPoolConfig: {
        appIdClientRegex: userPoolClient.userPoolClientId,
        awsRegion: process.env.CDK_DEFAULT_ACCOUNT,
        defaultAction: "ALLOW",
        userPoolId: userPool.userPoolId,
      },
    });
  }
}
