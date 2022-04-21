import { Handler } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

interface CreateUserEvent {
  arguments: {
    email: string;
  };
  identity: {
    userPoolId: string;
  };
}

const cognito = new CognitoIdentityServiceProvider();

export const handler: Handler<CreateUserEvent, boolean | void> = async (
  event,
  context,
  callback
) => {
  const {
    arguments: { email },
    identity: { userPoolId },
  } = event;

  const newUserParams = {
    UserPoolId: userPoolId,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
    TemporaryPassword: Math.random().toString(36).substr(2, 10),
  };

  try {
    await cognito.adminCreateUser(newUserParams);
    callback(null, true);
  } catch (e) {
    callback(e.message);
  }
};
