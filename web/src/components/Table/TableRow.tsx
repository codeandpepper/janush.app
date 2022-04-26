import React from "react";

import { TableRow as MuiTableRow, TableRowProps } from "@mui/material";

interface Props extends TableRowProps {
  children: React.ReactNode;
}

export const TableRow = ({ children, ...rowProps }: Props) => {
  return (
    <MuiTableRow
      {...rowProps}
      sx={{
        ...rowProps.sx,
      }}
    >
      {children}
    </MuiTableRow>
  );
};
