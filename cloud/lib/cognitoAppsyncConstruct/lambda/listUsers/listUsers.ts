import { Callback, Context } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const UserPoolId = process.env.USER_POOL_ID;

exports.main = async (
  event: unknown,
  context: Context,
  callback: Callback
): Promise<void> => {
  if (!UserPoolId) {
    throw new Error(`"USER_POOL_ID" not provided`);
  }

  const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

  const result = await new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.listUsers(
      {
        UserPoolId,
        AttributesToGet: ["email"],
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });

  callback(null, result);
};
