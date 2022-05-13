import { PasswordField } from "@components/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { CognitoError } from "@interfaces/Cognito";
import { Nullable } from "@janush-types/useful";
import { Box, Button } from "@mui/material";
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
  error?: Nullable<CognitoError>;
}

export const ResetPasswordForm: VFC<Props> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, formState, setError } =
    useForm<ResetPasswordFormState>({
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
            dataTestId="new-password"
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
            dataTestId="confirm-new-password"
          />
        )}
      />
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          data-testid="reset-password-button"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Save
        </Button>
        {/* TODO: fix loading  */}
        {/* {loading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )} */}
      </Box>
    </form>
  );
};
