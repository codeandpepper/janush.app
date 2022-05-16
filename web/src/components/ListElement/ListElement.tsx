import { VFC } from "react";

import { Box, Typography, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  label: string;
  value: string;
}

export const ListElement: VFC<Props> = ({ label, value }) => {
  const theme = useTheme<Theme>();

  return (
    <Box display="flex">
      <Typography
        width="120px"
        color={theme.palette.secondary.dark}
        fontSize={14}
        lineHeight={theme.spacing(3)}
      >
        {label}
      </Typography>
      <Typography fontSize={14} fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
};
