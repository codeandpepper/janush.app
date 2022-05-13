import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Box, Container, Typography } from "@mui/material";
import { VFC } from "react";
import { PasswordResetForm } from "./PasswordResetView/PasswordResetForm/PasswordResetForm";

const PasswordReset: VFC = () => {
  return (
    <AuthLayout>
      <Container maxWidth="xs">
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h4">
            Forgot password
          </Typography>
          <Typography variant="body1">
            Enter your email address and we will send you a link to reset your
            password.
          </Typography>
        </Box>
        <PasswordResetForm onSubmit={() => console.log(1)} loading={true} />
      </Container>
    </AuthLayout>
  );
};

export default PasswordReset;
