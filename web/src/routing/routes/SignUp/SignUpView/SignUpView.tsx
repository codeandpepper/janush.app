import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

import { AuthBottomBar } from "@components/AuthBottomBar/AuthBottomBar";
import { CognitoError } from "@interfaces/Cognito";
import { Nullable } from "@janush-types/useful";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Paths } from "@routing/paths";
import { SignUpForm } from "@routing/routes/SignUp/SignUpView/SignUpForm/SignUpForm";
import { SignUpFormState } from "./SignUpForm/formState";

interface Props {
  loading: boolean;
  onSignUp(formData: SignUpFormState): void;
  error: Nullable<CognitoError>;
}

export const SignUpView: React.VFC<Props> = ({ loading, onSignUp, error }) => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Create your account</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h4">
            Create your account
          </Typography>
        </Box>
        <SignUpForm loading={loading} onSubmit={onSignUp} error={error} />
      </Container>
      <AuthBottomBar
        text="Already have an account?"
        buttonLinkPath={Paths.SIGN_IN_PATH}
        buttonText="Sign in"
        buttonDataTestId="go-to-sign-in-page-button"
      />
    </AuthLayout>
  );
};
