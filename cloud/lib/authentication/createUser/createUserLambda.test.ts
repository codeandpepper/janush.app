import * as AWSMock from "aws-sdk-mock";
import * as LambdaTester from "lambda-tester";
import * as AWS from "aws-sdk";
import { AdminCreateUserRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";

describe("createUserLambda", () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore("CognitoIdentityServiceProvider", "adminCreateUser");
  });

  it("should return true when createUser succeed", async () => {
    const lambdaParams = {
      arguments: {
        email: "test@test.com",
      },
      identity: {
        userPoolId: "abc1234",
      },
    };

    AWSMock.mock(
      "CognitoIdentityServiceProvider",
      "adminCreateUser",
      jest.fn().mockResolvedValue(true)
    );

    const module = await import("./createUserLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectResult((result: unknown) => {
        expect(result).toBeTruthy();
      });
  });

  it("should throw error when createUser fail", async () => {
    const lambdaParams = {
      arguments: {
        email: "test@test.com",
      },
      identity: {
        userPoolId: "eu-west-1_12342dfs",
      },
    };

    AWSMock.mock("CognitoIdentityServiceProvider", "adminCreateUser", () => {
      throw new Error("problem with created user");
    });

    const module = await import("./createUserLambda");

    await LambdaTester(module.handler)
      .event(lambdaParams)
      .expectError((error: Error) => {
        expect(error.message).toEqual("problem with created user");
      });
  });
});
