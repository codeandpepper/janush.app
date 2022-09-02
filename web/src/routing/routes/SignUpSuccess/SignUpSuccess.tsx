import { VFC } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import { Link } from "@components/Link/Link";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Paths } from "@routing/paths";

const SignUpSuccess: VFC = () => {
  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Box px={2}>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            textAlign="center"
            data-testid="sign-up-success-page-title"
          >
            Account creation
          </Typography>
          <Typography variant="body1" textAlign="center" gutterBottom>
            Your account has been created. You can close this page now. We have
            sent next instructions to your email.
          </Typography>
          <Link to={Paths.BASE} underline="none">
            <Button
              data-testid="sign-up-success-page-back-button"
              color="primary"
              variant="text"
              fullWidth
            >
              Back to homepage
            </Button>
          </Link>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default SignUpSuccess;
