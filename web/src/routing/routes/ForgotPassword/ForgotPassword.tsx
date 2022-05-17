import { isCognitoError } from "@utils/isCognitoError/isCognitoError";
import { Auth } from "aws-amplify";
import { useState, VFC } from "react";
import { ForgotPasswordFormState } from "./ForgotPasswordView/ForgotPasswordForm/formState";
import { ForgotPasswordView } from "./ForgotPasswordView/ForgrotPasswordView";

const ForgotPassword: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onForgotPassword = async ({ email }: ForgotPasswordFormState) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await Auth.forgotPassword(email);
      setIsEmailSent(true);
    } catch (err: unknown) {
      if (isCognitoError(err)) {
        setError(err.message);
      } else {
        setError("Oops... Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordView
      onForgotPassword={onForgotPassword}
      loading={isLoading}
      error={error}
      isEmailSent={isEmailSent}
    />
  );
};

export default ForgotPassword;
