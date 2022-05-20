import { VFC } from "react";
import { Controller, useForm } from "react-hook-form";
import { EmailField } from "@components/EmailField/EmailField";
import { Box, Button, CircularProgress } from "@mui/material";
import { useStyles } from "./styles";
import { ForgotPasswordFormState } from "./formState";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordFormValidationSchema } from "./formValidationSchema";
import { ErrorMessage } from "@components/ErrorMessage/ErrorMessage";

interface Props {
  onSubmit(formData: ForgotPasswordFormState): void;
  loading: boolean;
  error?: string;
}

const defaultValues = {
  email: "",
};

export const ForgotPasswordForm: VFC<Props> = ({
  onSubmit,
  error,
  loading,
}) => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm<ForgotPasswordFormState>({
    defaultValues,
    resolver: yupResolver(forgotPasswordFormValidationSchema()),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <EmailField
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            autoComplete="email"
            autoFocus
          />
        )}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Send
        </Button>
        {loading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
      </Box>
    </Box>
  );
};
