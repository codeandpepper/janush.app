import { VFC } from "react";

import { useTheme } from "@mui/material/styles";
import { Theme, Checkbox } from "@mui/material";

import { Table } from "@components/Table/Table";
import { ConditionalText } from "@components/ConditionalText/ConditionalText";

import { User } from "@janush-types/user";

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

const UsersTable: VFC<Props> = ({ data, onRowClick }) => {
  const { TableHead, TableRow, TableCell, TableBody } = Table;

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
                  // TODO: change to proper color
                  backgroundColor: theme.palette.grey[100],
                },
              }}
              key={item.id}
              onClick={() => onRowClick(item)}
            >
              <TableCell>
                <Checkbox onClick={(e) => e.stopPropagation()} />
              </TableCell>
              <TableCell sx={{ fontWeight: 400 }}>{item.id}</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>{item.email}</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>{item.phoneNumber}</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>
                <ConditionalText
                  isPositive={item.access}
                  positiveLabel="Enabled"
                  negativeLabel="Disabled"
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 400 }}>
                <ConditionalText
                  isPositive={item.status}
                  positiveLabel="Confirmed"
                  negativeLabel="Unconfirmed"
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 400 }}>
                {item.lastModified}
              </TableCell>
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
