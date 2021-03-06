import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { VFC } from "react";
import { useForm, Controller } from "react-hook-form";

import { EmailField } from "@components/EmailField/EmailField";
import { Form } from "@components/Form/Form";
import { PasswordField } from "@components/PasswordField/PasswordField";

import { SignInFormState } from "./SignInFormState";
import { signInFormValidationSchema } from "./signInFormValidationSchema";
import { useStyles } from "./styles";

interface Props {
  error: string;
  loading: boolean;
  onSubmit(formData: SignInFormState): void;
}

const defaultValues: SignInFormState = {
  email: "",
  password: "",
};

export const SignInForm: VFC<Props> = ({ error, loading, onSubmit }) => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormState>({
    resolver: yupResolver(signInFormValidationSchema()),
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={errors.password?.message}
            ariaControls="password"
            dataTestId="password"
            label="Password"
            placeholder="Password"
            autoComplete="current-password"
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
          data-testid="sign-in-button"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Sign in
        </Button>
      </Box>
      {loading && (
        <CircularProgress size={20} className={classes.buttonProgress} />
      )}
    </Form>
  );
};
