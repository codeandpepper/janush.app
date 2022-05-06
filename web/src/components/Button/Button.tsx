import { FC } from "react";

import {
  Button as MuiButton,
  SxProps,
  Theme,
  ButtonProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { rgbaColors } from "@themes/palette";

interface Props extends ButtonProps {
  onClick?: () => void;
  sx?: SxProps;
}

export const Button: FC<Props> = ({
  onClick,
  sx,
  children,
  ...buttonProps
}) => {
  const theme = useTheme<Theme>();

  return (
    <MuiButton
      variant="contained"
      sx={{
        borderRadius: "4px",
        py: 1.25,
        px: 2,
        lineHeight: "16px",
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
        ...sx,
      }}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </MuiButton>
  );
};
