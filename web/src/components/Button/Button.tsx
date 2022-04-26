import { FC } from "react";

import { Button as MuiButton, SxProps, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export enum Variant {
  Contained = "contained",
  Outlined = "outlined",
}

interface Props {
  variant?: Variant;
  onClick?: () => void;
  sx?: SxProps;
}

export const Button: FC<Props> = ({
  variant = Variant.Contained,
  onClick,
  sx,
  children,
}) => {
  const theme = useTheme<Theme>();

  return (
    <MuiButton
      variant={variant}
      sx={{
        borderRadius: "4px",
        py: variant === Variant.Outlined ? 1.125 : 1.25,
        px: 2,
        lineHeight: "16px",
        color:
          variant === Variant.Outlined ? "rgba(0, 0, 0, 0.38)" : "common.white",
        borderColor:
          variant === Variant.Outlined
            ? "rgba(0, 0, 0, 0.38)"
            : theme.palette.secondary.main,
        textDecoration: "none",
        ":hover": {
          textDecoration: "none",
          borderColor:
            variant === Variant.Outlined
              ? "rgba(0, 0, 0, 0.38)"
              : theme.palette.secondary.main,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
