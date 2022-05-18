import { EnvName } from "@enums/EnvName";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { CognitoUserPoolCdkConstruct } from "../cognitoUserPoolCdkConstruct";

export const appleIdentityProvider = (
  construct: CognitoUserPoolCdkConstruct,
  envName: EnvName
): cognito.UserPoolIdentityProviderApple => {
  const appleClientId = process.env.IDENTITY_PROVIDER_APPLE_CLIENT_ID;
  const appleKeyId = process.env.IDENTITY_PROVIDER_APPLE_KEY_ID;
  const applePrivateKey = process.env.IDENTITY_PROVIDER_APPLE_PRIVATE_KEY;
  const appleTeamId = process.env.IDENTITY_PROVIDER_APPLE_TEAM_ID;

  if (appleClientId && appleKeyId && applePrivateKey && appleTeamId)
    return new cognito.UserPoolIdentityProviderApple(
      construct,
      `${envName}-CognitoUserPoolIdentityProviderApple`,
      {
        clientId: appleClientId,
        keyId: appleKeyId,
        privateKey: applePrivateKey,
        teamId: appleTeamId,
        userPool: construct.userPool,
        attributeMapping: {
          email: cognito.ProviderAttribute.APPLE_EMAIL,
        },
        scopes: ["name", "email"],
      }
    );
  else
    throw new Error(
      `Missing environment variables: ${
        !appleClientId && "IDENTITY_PROVIDER_APPLE_CLIENT_ID"
      } ${!appleKeyId && "IDENTITY_PROVIDER_APPLE_KEY_ID"} ${
        !applePrivateKey && "IDENTITY_PROVIDER_APPLE_PRIVATE_KEY"
      } ${!appleTeamId && "IDENTITY_PROVIDER_APPLE_TEAM_ID"}`
    );
};
