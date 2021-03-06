import {
  TextField as MuiTextField,
  StandardTextFieldProps,
} from "@mui/material";

export const TextField = (props: StandardTextFieldProps): JSX.Element => (
  <MuiTextField
    margin="normal"
    fullWidth
    color="primary"
    variant="outlined"
    {...props}
  />
);
