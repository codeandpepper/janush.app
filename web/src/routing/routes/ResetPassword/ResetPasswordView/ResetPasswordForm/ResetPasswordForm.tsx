import { PasswordField } from "@components/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { CognitoError } from "@interfaces/Cognito";
import { Nullable } from "@janush-types/useful";
import { Box, Button, Typography } from "@mui/material";
import { VFC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ResetPasswordFormState } from "./formState";
import { resetPasswordFormValidationSchema } from "./formValidationSchema";

const defaultValues: ResetPasswordFormState = {
  password: "",
  confirmPassword: "",
};

interface Props {
  onSubmit(formData: ResetPasswordFormState): void;
  loading?: boolean;
  error?: Nullable<CognitoError | string>;
}

export const ResetPasswordForm: VFC<Props> = ({ onSubmit, loading, error }) => {
  const { control, handleSubmit, formState } = useForm<ResetPasswordFormState>({
    resolver: yupResolver(resetPasswordFormValidationSchema()),
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={formState.errors.password?.message}
            ariaControls="password"
            label="Password"
            placeholder="Password"
            autoComplete="new-password"
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={formState.errors.confirmPassword?.message}
            ariaControls="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
        )}
      />
      <Typography color="error" align="center" mt={1} fontSize={14}>
        {error ? error : " "}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
