import { EnvName } from "@enums/EnvName";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { CognitoUserPoolCdkConstruct } from "../cognitoUserPoolCdkConstruct";

export const facebookIdentityProvider = (
  construct: CognitoUserPoolCdkConstruct,
  envName: EnvName
): cognito.UserPoolIdentityProviderFacebook => {
  const facebookClientId = process.env.IDENTITY_PROVIDER_FACEBOOK_CLIENT_ID;
  const facebookClientSecret =
    process.env.IDENTITY_PROVIDER_FACEBOOK_CLIENT_SECRET;

  if (facebookClientId && facebookClientSecret)
    return new cognito.UserPoolIdentityProviderFacebook(
      construct,
      `${envName}-CognitoUserPoolIdentityProviderFacebook`,
      {
        clientId: facebookClientId,
        clientSecret: facebookClientSecret,
        userPool: construct.userPool,
        attributeMapping: {
          email: cognito.ProviderAttribute.FACEBOOK_EMAIL,
        },
        scopes: ["public_profile", "email"],
      }
    );
  else
    throw new Error(
      `Missing environment variables: ${
        !facebookClientId && "IDENTITY_PROVIDER_FACEBOOK_CLIENT_ID"
      } ${!facebookClientSecret && "IDENTITY_PROVIDER_FACEBOOK_CLIENT_SECRET"}`
    );
};
