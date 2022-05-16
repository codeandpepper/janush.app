import { VFC } from "react";

import { Table } from "@components/Table/Table";
import { Group } from "@janush-types/group";
import { Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { rgbaColors } from "@themes/palette";
import { useNavigate } from "react-router-dom";

const columns = [
  { name: "name", label: "Name" },
  { name: "description", label: "Description" },
  { name: "members", label: "Members" },
  { name: "lastModified", label: "Last Modified" },
];

interface Props {
  data: Group[];
}

const { TableHead, TableRow, TableCell, TableBody } = Table;

const GroupsTable: VFC<Props> = ({ data }) => {
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
                  backgroundColor: rgbaColors.grey.darkest,
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
