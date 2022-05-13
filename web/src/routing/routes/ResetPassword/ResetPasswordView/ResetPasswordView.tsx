import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Paths } from "@routing/paths";
import { VFC } from "react";
import { Helmet } from "react-helmet";
import { ResetPasswordForm } from "./ResetPasswordForm/ResetPasswordForm";

export const ResetPasswordView: VFC = () => {
  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Helmet>
          <title>Create new password</title>
        </Helmet>
        <Box px={2} boxSizing="border-box">
          <Typography variant="h4" gutterBottom>
            Create new password
          </Typography>
          <Typography variant="body1">
            Your password must be 10 or more characters long & contain a mix of
            upper & lower case letters, numbers & symbols.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ResetPasswordForm
                loading={false}
                onSubmit={() => console.log(1)}
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
        </Box>
      </Container>
    </AuthLayout>
  );
};
