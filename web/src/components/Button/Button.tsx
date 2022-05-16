import { FC } from "react";

import { Button as MuiButton, Theme, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { rgbaColors } from "@themes/palette";

export const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  const theme = useTheme<Theme>();

  return (
    <MuiButton
      {...buttonProps}
      variant="contained"
      sx={{
        borderRadius: "4px",
        py: 1.25,
        px: 2,
        lineHeight: theme.spacing(2),
        color: "common.white",
        borderColor: theme.palette.secondary.main,
        textDecoration: "none",
        ":hover": {
          textDecoration: "none",
          borderColor: theme.palette.secondary.main,
        },
        "&.Mui-disabled": {
          color: rgbaColors.grey.main,
          border: `1px solid ${rgbaColors.grey.lighter}`,
          background: "none",
          py: 1.125,
        },
        ...buttonProps.sx,
      }}
    >
      {children}
    </MuiButton>
  );
};
