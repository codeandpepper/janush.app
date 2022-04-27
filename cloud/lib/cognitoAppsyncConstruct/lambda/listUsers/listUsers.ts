import { CognitoIdentityServiceProvider } from "aws-sdk";

const UserPoolId = process.env.USER_POOL_ID;

export const listUsers: (
  selectionSetList: string[]
) => Promise<CognitoIdentityServiceProvider.UsersListType> = async (
  selectionSetList
) => {
  if (!UserPoolId) {
    throw new Error(`"USER_POOL_ID" not provided`);
  }

  const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

  const result: CognitoIdentityServiceProvider.ListUsersResponse =
    await new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.listUsers(
        {
          UserPoolId,
          AttributesToGet: selectionSetList,
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });

  console.log("RESULT ATTRIBUTES", result);

  return result.Users || [];
};
