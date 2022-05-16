import { ReactNode } from "react";

import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";

import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";

interface Props {
  children: ReactNode;
  dataTestId?: string;
}

export const Table = ({ children, ...restProps }: Props) => (
  <TableContainer component={Paper} sx={{ boxShadow: "none" }} {...restProps}>
    <MuiTable sx={{ minWidth: 650 }}>{children}</MuiTable>
  </TableContainer>
);

Table.TableCell = TableCell;
Table.TableBody = TableBody;
Table.TableHead = TableHead;
Table.TableRow = TableRow;
