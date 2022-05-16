import { TextField } from "@components/TextField/TextField";
import { Mail } from "@mui/icons-material";
import { InputAdornment, StandardTextFieldProps } from "@mui/material";

interface Props extends StandardTextFieldProps {
  errorMessage?: string | undefined;
}

export const EmailField = ({
  errorMessage,
  ...restProps
}: Props): JSX.Element => (
  <TextField
    type="email"
    label="Email"
    autoComplete="email"
    placeholder="Email"
    autoFocus
    fullWidth
    required
    error={Boolean(errorMessage)}
    helperText={errorMessage}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Mail color="primary" />
        </InputAdornment>
      ),
      inputProps: {
        "data-testid": "email-input-field",
      },
    }}
    {...restProps}
  />
);
