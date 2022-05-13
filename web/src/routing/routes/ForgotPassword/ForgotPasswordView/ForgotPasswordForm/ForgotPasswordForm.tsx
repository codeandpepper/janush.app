import { VFC } from "react";
import { Controller, useForm } from "react-hook-form";
import { EmailField } from "@components/EmailField/EmailField";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useStyles } from "./styles";

interface Props {
  onSubmit(formData: ForgotPasswordFormState): void;
  loading: boolean;
  error?: string;
}

interface ForgotPasswordFormState {
  email: string;
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormState>({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <EmailField
            onChange={field.onChange}
            errorMessage={errors.email?.message}
            autoComplete="email"
            autoFocus
          />
        )}
      />
      <Typography
        data-testid="incorrect-email-or-password"
        color="error"
        align="center"
        mt={1}
        fontSize={14}
      >
        {error ? error : " "}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          data-testid="reset-password-button"
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
    </form>
  );
};
