import { EnvName } from "@enums/EnvName";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { CognitoUserPoolCdkConstruct } from "../cognitoUserPoolCdkConstruct";

export const googleIdentityProvider = (
  construct: CognitoUserPoolCdkConstruct,
  envName: EnvName
): cognito.UserPoolIdentityProviderGoogle => {
  const googleClientId = process.env.IDENTITY_PROVIDER_GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.IDENTITY_PROVIDER_GOOGLE_CLIENT_SECRET;

  if (googleClientId && googleClientSecret)
    return new cognito.UserPoolIdentityProviderGoogle(
      construct,
      `${envName}-CognitoUserPoolIdentityProviderGoogle`,
      {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        userPool: construct.userPool,
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        },
        scopes: ["profile", "email"],
      }
    );
  else
    throw new Error(
      `Missing environment variables: ${
        !googleClientId && "IDENTITY_PROVIDER_GOOGLE_CLIENT_ID"
      } ${!googleClientSecret && "IDENTITY_PROVIDER_GOOGLE_CLIENT_SECRET"}`
    );
};
