export const authSelectors = {
  inputs: {
    email: "email-input-field",
    password: "password-input-field",
    confirmPassword: "confirm-password-input-field",
  },
  buttons: {
    showPassword: "password-show-icon",
    showConfirmPassword: "confirm-password-show-icon",
    signUp: "sign-up-button",
    signIn: "sign-in-button",
    goToSignUpPage: "go-to-sign-up-page-button",
    goToSignInPage: "go-to-sign-in-page-button",
    resendEmail: "resend-email-button",
    backToSignIn: "back-to-sign-in-button",
    forgotPassword: "forgot-password-button",
    sendForgottenPassword: "send-forgotten-password-button",
  },
  containers: {
    validationError: "p.Mui-error",
    incorrectEmailOrPassword: "incorrect-email-or-password",
  },
  texts: {
    emailOnVerifyEmailPage: "email-on-verify-email-page",
  },
} as const;
