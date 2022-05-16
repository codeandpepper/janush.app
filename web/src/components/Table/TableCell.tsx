import { FC, ReactNode } from "react";

import {
  TableCell as MuiTableCell,
  TableCellProps,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props extends TableCellProps {
  children: ReactNode;
}

export const TableCell: FC<Props> = ({ children, ...tableCellProps }) => {
  const theme = useTheme<Theme>();

  return (
    <MuiTableCell
      align="left"
      {...tableCellProps}
      sx={{
        lineHeight: theme.spacing(3),
        fontWeight: 700,
        ...tableCellProps.sx,
      }}
    >
      {children}
    </MuiTableCell>
  );
};
