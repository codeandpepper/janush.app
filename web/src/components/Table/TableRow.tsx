import { ReactNode, FC } from "react";

import { TableRow as MuiTableRow, TableRowProps } from "@mui/material";

interface Props extends TableRowProps {
  children: ReactNode;
}

export const TableRow: FC<Props> = ({ children, ...rowProps }) => (
  <MuiTableRow {...rowProps}>{children}</MuiTableRow>
);
