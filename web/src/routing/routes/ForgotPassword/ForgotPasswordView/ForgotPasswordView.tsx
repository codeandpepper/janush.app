import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { VFC } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm/ForgotPasswordForm";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ForgotPasswordFormState } from "./ForgotPasswordForm/formState";
import { Paths } from "@routing/paths";
import { Link } from "@components/Link/Link";

interface Props {
  error: string;
  loading: boolean;
  onForgotPassword(formData: ForgotPasswordFormState): void;
  isEmailSent?: boolean;
}

const EmailSentContentBox: VFC = () => (
  <Box px={2}>
    <Typography
      color="textPrimary"
      gutterBottom
      variant="h4"
      textAlign="center"
    >
      Resetting your password
    </Typography>
    <Typography variant="body1" textAlign="center" gutterBottom>
      If provided email does exists in our database then we will sent reset lin
      on it. You can close this page now.
    </Typography>
    <Link to={Paths.SIGN_IN_PATH} underline="none">
      <Button color="primary" variant="text" fullWidth>
        Back to sign in page
      </Button>
    </Link>
  </Box>
);

const ForgotPasswordContentBox: VFC<Props> = ({
  onForgotPassword,
  loading,
  error,
}) => {
  const history = useHistory();

  return (
    <Box px={2} boxSizing="border-box">
      <Typography color="textPrimary" gutterBottom variant="h4">
        Forgot your password?
      </Typography>
      <Typography variant="body1">
        Please write email you used during create account process. We will send
        you a message with instructions.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ForgotPasswordForm
            onSubmit={onForgotPassword}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={loading}
            onClick={history.goBack}
            color="primary"
            variant="text"
            fullWidth
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const ForgotPasswordView: VFC<Props> = ({
  onForgotPassword,
  loading,
  error,
  isEmailSent,
}) => (
  <AuthLayout>
    <Container maxWidth="xs">
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      {isEmailSent ? (
        <EmailSentContentBox />
      ) : (
        <ForgotPasswordContentBox
          onForgotPassword={onForgotPassword}
          loading={loading}
          error={error}
        />
      )}
    </Container>
  </AuthLayout>
);
