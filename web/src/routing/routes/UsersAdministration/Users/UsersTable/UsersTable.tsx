import { VFC, FC } from "react";

import { Table } from "@components/Table/Table";
import { User } from "@janush-types/user";
import { Typography, Theme, Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { rgbaColors } from "@themes/palette";

const columns = [
  { name: "checkbox", label: "" },
  { name: "id", label: "ID" },
  { name: "email", label: "Email" },
  { name: "phoneNumber", label: "Phone Number" },
  { name: "access", label: "Access" },
  { name: "status", label: "Status" },
  { name: "lastmodified", label: "Last Modified" },
];

interface Props {
  data: User[];
  onRowClick: (user: User) => void;
}

const { TableHead, TableRow, TableCell, TableBody } = Table;

const TableCellStyled: FC = ({ children }) => (
  <TableCell sx={{ fontWeight: 400 }}>{children}</TableCell>
);

const UsersTable: VFC<Props> = ({ data, onRowClick }) => {
  const theme = useTheme<Theme>();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.label}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody sx={{ fontWeight: null }}>
        {data.length ? (
          data.map((item) => (
            <TableRow
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: rgbaColors.grey.darkest,
                },
              }}
              key={item.id}
              onClick={() => onRowClick(item)}
            >
              <TableCell>
                <Checkbox onClick={(e) => e.stopPropagation()} />
              </TableCell>
              <TableCellStyled>{item.id}</TableCellStyled>
              <TableCellStyled>{item.email}</TableCellStyled>
              <TableCellStyled>{item.phoneNumber}</TableCellStyled>
              <TableCellStyled>
                <Typography
                  component="span"
                  color={
                    item.access
                      ? theme.palette.primary.main
                      : theme.palette.error.main
                  }
                  fontSize="14px"
                >
                  {item.access ? "Enabled" : "Disabled"}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                <Typography
                  component="span"
                  color={
                    item.status
                      ? theme.palette.primary.main
                      : theme.palette.error.main
                  }
                  fontSize="14px"
                >
                  {item.access ? "Confirmed" : "Unconfirmed"}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>{item.lastModified}</TableCellStyled>
            </TableRow>
          ))
        ) : (
          <Table.TableRow sx={{ background: "grey" }}>
            <Table.TableCell colSpan={6} sx={{ fontWeight: 400 }}>
              No results
            </Table.TableCell>
          </Table.TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
