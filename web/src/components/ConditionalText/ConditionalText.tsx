import { Typography, Theme } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";

interface Props {
  isPositive: boolean;
  positiveLabel: string;
  negativeLabel: string;
}

export const ConditionalText: FC<Props> = ({
  isPositive,
  positiveLabel,
  negativeLabel,
}) => {
  const theme = useTheme<Theme>();

  return (
    <Typography
      component="span"
      color={isPositive ? theme.palette.primary.main : theme.palette.error.main}
      fontSize="14px"
    >
      {isPositive ? positiveLabel : negativeLabel}
    </Typography>
  );
};
