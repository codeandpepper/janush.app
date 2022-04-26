import React from "react";
import { TableCell as MuiTableCell, TableCellProps } from "@mui/material";

interface Props extends TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({ children, ...tableCellProps }: Props) => (
  <MuiTableCell
    align="left"
    {...tableCellProps}
    sx={{
      lineHeight: "24px",
      fontWeight: 700,
      ...tableCellProps.sx,
    }}
  >
    {children}
  </MuiTableCell>
);
