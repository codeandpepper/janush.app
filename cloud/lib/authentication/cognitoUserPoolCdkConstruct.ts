import { StackProps, Duration, aws_cognito as cognito } from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../../enums/EnvName";
import { EmailsCdkConstruct } from "./emails/emailsCdkConstruct";
import {
  facebookIdentityProvider,
  googleIdentityProvider,
  appleIdentityProvider,
} from "./identityProviders";

interface CognitoUserPoolProps {
  envName: EnvName;
}

export class CognitoUserPoolCdkConstruct extends Construct {
  public userPool: cognito.UserPool;
  public userPoolClient: cognito.UserPoolClient;
  public userPoolDomain: cognito.UserPoolDomain;
  //Identity providers generated depending on selected auth methods
  public userPoolIdentityProviderFacebook: cognito.UserPoolIdentityProviderFacebook;
  public userPoolIdentityProviderGoogle: cognito.UserPoolIdentityProviderGoogle;
  public userPoolIdentityProviderApple: cognito.UserPoolIdentityProviderApple;

  constructor(
    scope: Construct,
    id: string,
    { envName }: StackProps & CognitoUserPoolProps
  ) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, `${envName}-CognitoUserPool`, {
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 10,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
        tempPasswordValidity: Duration.days(3),
      },
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: false,
        },
      },
    });

    this.userPoolClient = new cognito.UserPoolClient(
      this,
      `${envName}-CognitoUserPoolClient`,
      {
        disableOAuth: false,
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.COGNITO,
          //Supported providers generated depending on selected auth methods
          cognito.UserPoolClientIdentityProvider.FACEBOOK,
          cognito.UserPoolClientIdentityProvider.GOOGLE,
          cognito.UserPoolClientIdentityProvider.APPLE,
        ],
        oAuth: {
          callbackUrls: [
            process.env.USER_POOL_REDIRECT_SIGN_IN || "http://localhost:3000/",
          ],
          logoutUrls: [
            process.env.USER_POOL_REDIRECT_SIGN_OUT || "http://localhost:3000/",
          ],
        },
        preventUserExistenceErrors: true,
        userPool: this.userPool,
      }
    );

    //Facebook identity provider config - generated when Facebook auth is selected
    this.userPoolIdentityProviderFacebook = facebookIdentityProvider(
      this,
      envName
    );

    //Google identity provider config - generated when Google auth is selected
    this.userPoolIdentityProviderGoogle = googleIdentityProvider(this, envName);

    //Apple identity provider config - generated when Apple auth is selected
    this.userPoolIdentityProviderApple = appleIdentityProvider(this, envName);

    this.userPoolDomain = new cognito.UserPoolDomain(
      this,
      `${envName}-CognitoUserPoolDomain`,
      {
        userPool: this.userPool,
        cognitoDomain: {
          //domain prefix generated depending on app name and random uuid
          domainPrefix: "janush-auto-generated-app-cloud-aig54kbrnpsa",
        },
      }
    );

    this.userPoolClient.node.addDependency(this.userPool);
    this.userPoolClient.node.addDependency(
      this.userPoolIdentityProviderFacebook
    );
    this.userPoolClient.node.addDependency(this.userPoolIdentityProviderGoogle);
    this.userPoolClient.node.addDependency(this.userPoolIdentityProviderApple);

    const { messageLambda } = new EmailsCdkConstruct(
      this,
      // CME = CustomMessageEmails
      `${envName}-CME`,
      { envName }
    );

    this.userPool.addTrigger(
      cognito.UserPoolOperation.CUSTOM_MESSAGE,
      messageLambda
    );
  }
}
