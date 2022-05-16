import React, { useState } from "react";

import { Link } from "@components/Link/Link";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Paths } from "@routing/paths";
import { VerifyEmailForm } from "@routing/routes/VerifyEmail/VerifyEmailView/VerifyEmailForm";
import { Auth } from "aws-amplify";
import { Helmet } from "react-helmet";
import { useLocation, Navigate } from "react-router-dom";

import { useStyles } from "./styles";

interface LocationState {
  email?: string;
}

const VerifyEmail: React.VFC = () => {
  const classes = useStyles();

  const location = useLocation();
  const state = location.state as LocationState;

  const [disabled, setDisabled] = useState<boolean>(false);

  async function handleResendEmail() {
    try {
      setDisabled(true);

      await Auth.resendSignUp(state.email!);
    } catch (err) {
      setDisabled(false);
    }
  }

  if (!state?.email) return <Navigate to="/" replace />;

  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Helmet>
          <title>Verify email</title>
        </Helmet>
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom>
            Verify your email
          </Typography>
          <Typography variant="body1">
            If you have not registered before, we will send you a verification
            email to the address below."
          </Typography>

          <Box pt={1.1} pb={1.3} my={1.5}>
            <Typography
              variant="body1"
              data-testid="email-on-verify-email-page"
              color="primary"
              className={classes.email}
            >
              {state?.email}
            </Typography>
          </Box>

          <Box pb={1.3}>
            <Typography variant="body1">
              Use sent link to confirm your registration.
            </Typography>
          </Box>

          <Box pb={3}>
            <Typography variant="body1">
              If you do not see an email from us, please check your email
              address and SPAM folder.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <VerifyEmailForm email={state?.email} />
            </Grid>
            <Grid item xs={12}>
              <Button
                data-testid="resend-email-button"
                onClick={() => handleResendEmail()}
                disabled={disabled}
                variant="contained"
                color="primary"
                fullWidth
              >
                Resend email
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={Paths.SIGN_IN_PATH} style={{ textDecoration: "none" }}>
                <Button
                  color="primary"
                  variant="text"
                  data-testid="back-to-sign-in-button"
                  fullWidth
                >
                  Back to sign in page
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default VerifyEmail;
