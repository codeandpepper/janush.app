import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../enums/EnvName";
import { CognitoCdkConstruct } from "./authentication/cognitoCdkConstruct";

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
    // ========================================================================

    new CognitoCdkConstruct(this, `${envName}-CognitoUserPool`, {
      envName,
    });
  }
}