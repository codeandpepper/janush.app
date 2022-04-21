import { Construct } from "constructs";
import { EnvName } from "@enums/EnvName";
import { aws_lambda_nodejs as lambda, aws_iam as iam } from "aws-cdk-lib";
import * as path from "path";
import { DEFAULT_LAMBDA_RUNTIME } from "@consts/index";

interface CreateUserProps {
  envName: EnvName;
  userPoolArn: string;
}

export class CreateUserCdkConstruct extends Construct {
  public readonly createUserLambda: lambda.NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    { envName, userPoolArn }: CreateUserProps
  ) {
    super(scope, id);

    this.createUserLambda = new lambda.NodejsFunction(
      this,
      `${envName}-CreateUserLambda`,
      {
        entry: path.join(__dirname, "./createUserLambda.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["cognito-idp:idp:AdminCreateUser"],
            effect: iam.Effect.ALLOW,
            resources: [userPoolArn],
          }),
        ],
        runtime: DEFAULT_LAMBDA_RUNTIME,
      }
    );
  }
}
