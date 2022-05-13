import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Paths } from "@routing/paths";
import { VFC } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ForgotPasswordForm } from "./ForgotPasswordView/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword: VFC = () => {
  const history = useHistory();

  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Helmet>
          <title>Forgot password</title>
        </Helmet>
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h4">
            Forgot your password?
          </Typography>
          <Typography variant="body1">
            Please write email you used during create account process. We will
            send you a message with instructions.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ForgotPasswordForm
                onSubmit={() => console.log(1)}
                loading={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => history.goBack()}
                color="primary"
                variant="text"
                data-testid="forgot-password-go-back"
                fullWidth
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default ForgotPassword;
