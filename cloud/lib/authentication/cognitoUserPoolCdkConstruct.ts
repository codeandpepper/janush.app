import { StackProps, Duration, aws_cognito as cognito } from "aws-cdk-lib";
import { Construct } from "constructs";

import { EnvName } from "../../enums/EnvName";
import { EmailsCdkConstruct } from "./emails/emailsCdkConstruct";

interface CognitoUserPoolProps {
  envName: EnvName;
}

export class CognitoUserPoolCdkConstruct extends Construct {
  public userPool: cognito.UserPool;
  public userPoolClient: cognito.UserPoolClient;
  public userPoolGroups: cognito.CfnUserPoolGroup;
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
        ],
        preventUserExistenceErrors: true,
        userPool: this.userPool,
      }
    );

    this.userPoolGroups = new cognito.CfnUserPoolGroup(
      this,
      `${envName}-AdminUserPoolGroup`,
      {
        userPoolId: this.userPool.userPoolId,
        description: "Admin group for users management",
        groupName: "admin",
      }
    );

    this.userPoolClient.node.addDependency(this.userPool);

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
