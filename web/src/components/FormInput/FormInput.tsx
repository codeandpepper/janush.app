import { VFC } from "react";

import { TextField, StandardTextFieldProps } from "@mui/material";

interface Props extends StandardTextFieldProps {
  errorMessage?: string | undefined;
}

export const FormInput: VFC<Props> = ({
  errorMessage,
  ...restProps
}: Props) => (
  <TextField
    fullWidth
    error={Boolean(errorMessage)}
    helperText={errorMessage}
    variant="filled"
    {...restProps}
  />
);
