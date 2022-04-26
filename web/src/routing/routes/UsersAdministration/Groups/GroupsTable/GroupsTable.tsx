import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Table } from "@components/Table/Table";

import { Group } from "@janush-types/group";

const columns = [
  { name: "name", label: "Name" },
  { name: "description", label: "Description" },
  { name: "members", label: "Members" },
  { name: "lastModified", label: "Last Modified" },
];

interface Props {
  data: Group[];
}

const GroupsTable: FC<Props> = ({ data }) => {
  const { TableHead, TableRow, TableCell, TableBody } = Table;

  const navigate = useNavigate();
  const theme = useTheme<Theme>();

  const onRowClick = (group: Group) => {
    navigate(group.id, { state: { group } });
  };

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
              <TableCell sx={{ fontWeight: 400 }}>{item.name}</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>{item.description}</TableCell>
              <TableCell sx={{ fontWeight: 400 }}>{item.members}</TableCell>
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

export default GroupsTable;
