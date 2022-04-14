import { aws_appsync as appSync, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { EnvName } from "@enums/EnvName";

interface AppSyncProps {
  envName: EnvName;
}

export class AppSyncCdkConstruct extends Construct {
  public api: appSync.CfnGraphQLApi;
  constructor(
    scope: Construct,
    id: string,
    { envName }: StackProps & AppSyncProps
  ) {
    super(scope, id);

    this.api = new appSync.CfnGraphQLApi(this, `${envName}-AppSyncApi`, {
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      name: "Api",
    });
  }
}
