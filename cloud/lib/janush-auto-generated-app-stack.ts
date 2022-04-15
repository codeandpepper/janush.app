import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../enums/EnvName";
import { CognitoCdkConstruct } from "./authentication/cognitoCdkConstruct";
import { AppSyncCdkConstruct } from "./api/appSyncCdkConstruct";

interface SingleEnvironmentProps {
  envName: EnvName;
}

export class JanushAutoGeneratedAppStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    { envName, ...stackProps }: StackProps & SingleEnvironmentProps
  ) {
    super(scope, id, stackProps);

    // The code that defines your stack goes here

    // ========================================================================
    // Authentication: Amazon Cognito
    // GraphQL API: AWS AppSync
    // ========================================================================

    const cognito = new CognitoCdkConstruct(
      this,
      `${envName}-CognitoUserPool`,
      {
        envName,
      }
    );

    const userPool = cognito.cognitoUserPool;
    const userPoolClient = cognito.cognitoUserPoolClient;

    new AppSyncCdkConstruct(this, `${envName}-AppSyncApi`, {
      envName,
      userPool,
      userPoolClient,
    });
  }
}
