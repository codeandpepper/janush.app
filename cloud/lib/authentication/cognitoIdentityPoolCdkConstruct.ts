import {
  StackProps,
  aws_cognito as cognito,
  aws_iam as iam,
} from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../../enums/EnvName";

interface CognitoIdentityPoolProps {
  envName: EnvName;
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
}

export class CognitoIdentityPoolCdkConstruct extends Construct {
  public identityPool: cognito.CfnIdentityPool;
  public identityPoolRoleAttachment: cognito.CfnIdentityPoolRoleAttachment;
  constructor(
    scope: Construct,
    id: string,
    { envName, userPool, userPoolClient }: StackProps & CognitoIdentityPoolProps
  ) {
    super(scope, id);

    this.identityPool = new cognito.CfnIdentityPool(
      this,
      `${envName}-CognitoIdentityPool`,
      {
        allowClassicFlow: false,
        allowUnauthenticatedIdentities: true,
        cognitoIdentityProviders: [
          {
            clientId: userPoolClient.userPoolClientId,
            providerName: userPool.userPoolProviderName,
            serverSideTokenCheck: false,
          },
        ],
      }
    );

    this.identityPool.node.addDependency(userPoolClient);
    this.identityPool.node.addDependency(userPool);

    // IAM Role for unauthorized Cognito users
    const unauthorizedCognitoUserRole = new iam.Role(
      this,
      `${envName}-RoleForUnauthenticatedCognitoUser`,
      {
        description: "Default role for anonymous users",
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": this.identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "unauthenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
      }
    );

    // IAM Role for authorized Cognito users
    const authorizedCognitoUserRole = new iam.Role(
      this,
      "RoleForAuthenticatedCognitoUser",
      {
        description: "Default role for authenticated users",
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": this.identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "authenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
      }
    );

    // Set unauthenticated / authenticated roles for Cognito Identity Pool
    this.identityPoolRoleAttachment = new cognito.CfnIdentityPoolRoleAttachment(
      this,
      `${envName}-CognitoPoolRoleAttachment`,
      {
        identityPoolId: this.identityPool.ref,
        roles: {
          unauthenticated: unauthorizedCognitoUserRole.roleArn,
          authenticated: authorizedCognitoUserRole.roleArn,
        },
      }
    );
  }
}
