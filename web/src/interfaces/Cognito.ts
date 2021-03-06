import { CognitoErrorType } from "@janush-types/enums/Cognito";

export interface CognitoError {
  type: CognitoErrorType;
  message: string;
  code?: CognitoErrorType;
}
