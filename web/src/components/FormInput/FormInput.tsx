import { FC } from "react";

import { TextField, StandardTextFieldProps, SxProps } from "@mui/material";

interface Props extends StandardTextFieldProps {
  label: string;
  errorMessage?: string | undefined;
  sx?: SxProps;
}

export const FormInput: FC<Props> = ({
  name,
  label,
  errorMessage,
  ...restProps
}: Props) => {
  return (
    <TextField
      label={label}
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      variant="filled"
      {...restProps}
    />
  );
};
