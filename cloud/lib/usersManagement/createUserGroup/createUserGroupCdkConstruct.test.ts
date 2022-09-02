import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as JanushAutoGeneratedApp from "../../janush-auto-generated-app-stack";
import { EnvName } from "@enums/EnvName";
import { defaultPermissions } from "./defaultGroups";

describe("Create User Group Stack [Auth]", () => {
  process.env.CDK_DEFAULT_REGION = "eu-west-1";
  const region = process.env.CDK_DEFAULT_REGION;

  if (!region) {
    throw new Error('"region" required!');
  }

  const app = new cdk.App();
  const stack = new JanushAutoGeneratedApp.JanushAutoGeneratedAppStack(
    app,
    "MyTestStack",
    {
      envName: EnvName.Development,
      env: {
        region,
      },
    }
  );

  const template = Template.fromStack(stack);

  it("should have default user pool permissions", () => {
    defaultPermissions.forEach((permission) => {
      template.hasResource("AWS::Cognito::UserPoolGroup", {
        Properties: {
          GroupName: permission.name,
        },
      });
    });
  });
});