import { CfnOutput, StackProps, aws_cognito as cognito } from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../../enums/EnvName";
import { ServicePurpose } from "../../enums/ServicePurpose";
import { applyTagsToResource } from "../../utils/functions";
import { CognitoIdentityPoolCdkConstruct } from "./cognitoIdentityPoolCdkConstruct";
import { CognitoUserPoolCdkConstruct } from "./cognitoUserPoolCdkConstruct";

interface CognitoProps {
  envName: EnvName;
}

export class CognitoCdkConstruct extends Construct {
  public cognitoUserPool: cognito.UserPool;
  public cognitoUserPoolClient: cognito.UserPoolClient;
  public cognitoUserPoolGroups: cognito.CfnUserPoolGroup;
  constructor(
    scope: Construct,
    id: string,
    { envName }: StackProps & CognitoProps
  ) {
    super(scope, id);

    const { userPool, userPoolClient, userPoolGroups } =
      new CognitoUserPoolCdkConstruct(this, `${envName}-CognitoUserPool`, {
        envName,
      });

    this.cognitoUserPool = userPool;
    this.cognitoUserPoolClient = userPoolClient;
    this.cognitoUserPoolGroups = userPoolGroups;

    const { identityPool, identityPoolRoleAttachment } =
      new CognitoIdentityPoolCdkConstruct(
        this,
        `${envName}-CognitoIdentityPool`,
        {
          envName,
          userPool,
          userPoolClient,
        }
      );

    new CfnOutput(this, "CognitoIdentityPoolExport", {
      exportName: "cognitoIdentityPoolIdJanushAutoGeneratedApp",
      value: identityPool.ref,
    });

    new CfnOutput(this, "CognitoUserPoolIdExport", {
      exportName: "cognitoUserPoolIdJanushAutoGeneratedApp",
      value: userPool.userPoolId,
    });

    new CfnOutput(this, "CognitoUserPoolClientIdExport", {
      exportName: "cognitoUserPoolClientIdJanushAutoGeneratedApp",
      value: userPoolClient.userPoolClientId,
    });

    applyTagsToResource(
      [userPool, userPoolClient, identityPool, identityPoolRoleAttachment],
      {
        envName,
        purpose: ServicePurpose.Authentication,
      }
    );
  }
}
