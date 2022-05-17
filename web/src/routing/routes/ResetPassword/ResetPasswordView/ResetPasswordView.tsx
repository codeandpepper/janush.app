import { CognitoError } from "@interfaces/Cognito";
import { Nullable } from "@janush-types/useful";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Paths } from "@routing/paths";
import { VFC } from "react";
import { Helmet } from "react-helmet";
import { ResetPasswordFormState } from "./ResetPasswordForm/formState";
import { ResetPasswordForm } from "./ResetPasswordForm/ResetPasswordForm";

interface Props {
  onSubmit(formData: ResetPasswordFormState): void;
  loading?: boolean;
  error?: Nullable<CognitoError | string>;
}

export const ResetPasswordView: VFC<Props> = ({ onSubmit, loading, error }) => {
  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Helmet>
          <title>Create new password</title>
        </Helmet>
        <Box px={2} boxSizing="border-box">
          {loading ? (
            <>
              <Typography variant="body1" gutterBottom textAlign="center">
                We are currently verifying your email. You should be able to log
                into Holy Sun in a moment.
              </Typography>
              <CircularProgress size={20} />
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Create new password
              </Typography>
              <Typography variant="body1">
                Your password must be 10 or more characters long & contain a mix
                of upper & lower case letters, numbers & symbols.
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ResetPasswordForm
                    loading={loading}
                    onSubmit={onSubmit}
                    error={error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    href={Paths.BASE}
                    color="primary"
                    variant="text"
                    data-testid="reset-password-cancel"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </AuthLayout>
  );
};
