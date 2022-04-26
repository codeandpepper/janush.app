import { useState, VFC } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import UsersTable from "./UsersTable/UsersTable";
import { Button, Variant } from "@components/Button/Button";

import { User } from "@janush-types/user";

import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Select } from "@components/Select/Select";

enum SearchBy {
  Id = "id",
  Email = "email",
  Access = "access",
  Status = "status",
}

enum Status {
  All = "all",
  Confirmed = "confirmed",
  Unconfirmed = "unconfirmed",
}

enum Access {
  All = "all",
  Enabled = "enabled",
  Disabled = "disabled",
}

const searchByOptions = [
  { name: SearchBy.Id, label: "ID" },
  { name: SearchBy.Email, label: "Email" },
  { name: SearchBy.Access, label: "Access" },
  { name: SearchBy.Status, label: "Status" },
];

const statusOptions = [
  { name: Status.All, label: "All" },
  { name: Status.Confirmed, label: "Confirmed" },
  { name: Status.Unconfirmed, label: "Unconfirmed" },
];

const accessOptions = [
  { name: Access.All, label: "All" },
  { name: Access.Enabled, label: "Enabled" },
  { name: Access.Disabled, label: "Disabled" },
];

const data: User[] = [
  {
    id: "1c4a9a8d-b652-421a-b130-9ad680029521",
    email: "b.szurek@codeandpepper.com",
    phoneNumber: "+48 666 777 888",
    access: true,
    status: true,
    lastModified: "15-06-2021",
  },
  {
    id: "1c4a9a8d-b652-421a-b130-9ad680029522",
    email: "b.szurek@codeandpepper.com",
    phoneNumber: "+48 666 777 888",
    access: false,
    status: false,
    lastModified: "15-06-2021",
  },
  {
    id: "1c4a9a8d-b652-421a-b130-9ad680029523",
    email: "b.szurek@codeandpepper.com",
    phoneNumber: "+48 666 777 888",
    access: true,
    status: false,
    lastModified: "15-06-2021",
  },
];

const Users: VFC = () => {
  const [search, setSearch] = useState({
    searchBy: SearchBy.Email,
    searchFor: "",
  });
  const [status, setStatus] = useState(Status.All);
  const [access, setAccess] = useState(Access.All);

  const navigate = useNavigate();

  const onTableRowClick = (user: User) => {
    navigate(user.id, { state: { user } });
  };

  return (
    <UsersAdministrationLayout
      buttons={
        <>
          <Button sx={{ mr: 2 }}>Create user</Button>
          <Button sx={{ mr: 2 }} variant={Variant.Outlined}>
            Add to group
          </Button>
          <Button sx={{ mr: 2 }} variant={Variant.Outlined}>
            Enable
          </Button>
          <Button sx={{ mr: 2 }} variant={Variant.Outlined}>
            Disable
          </Button>
        </>
      }
    >
      <Box
        sx={{
          pb: 6.5,
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Box p={2} display="flex" justifyContent="space-between">
          <Box display="flex" mt={1.5}>
            <Select
              value={search.searchBy}
              onChange={(e) =>
                setSearch({
                  ...search,
                  searchBy: e.target.value as SearchBy,
                })
              }
              options={searchByOptions}
              sx={{
                width: 136,
                mr: 2,
                "& .MuiSelect-select": {
                  pl: 2,
                  pb: 1,
                },
                "& .MuiSvgIcon-root": {
                  mr: 1.5,
                },
              }}
            />
            {search.searchBy === SearchBy.Email && (
              <Input
                placeholder="Search for value"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                sx={{
                  pl: 2,
                  pr: 1.5,
                  width: 272,
                  "& .MuiInput-input": {
                    pb: 1,
                  },
                }}
              />
            )}
            {search.searchBy === SearchBy.Status && (
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                options={statusOptions}
                sx={{
                  width: 272,
                  "& .MuiSelect-select": {
                    pl: 2,
                  },
                  "& .MuiSvgIcon-root": {
                    mr: 1.5,
                  },
                }}
              />
            )}
            {search.searchBy === SearchBy.Access && (
              <Select
                value={access}
                onChange={(e) => setAccess(e.target.value as Access)}
                options={accessOptions}
                sx={{
                  width: 272,
                  "& .MuiSelect-select": {
                    pl: 2,
                  },
                  "& .MuiSvgIcon-root": {
                    mr: 1.5,
                  },
                }}
              />
            )}
          </Box>
          <Typography mt={1}>
            <Typography
              component={"span"}
              fontWeight={600}
            >{`Showing ${data.length} of ${data.length}`}</Typography>
            {` (selected 0)`}
          </Typography>
        </Box>
        <UsersTable data={data} onRowClick={onTableRowClick} />
      </Box>
    </UsersAdministrationLayout>
  );
};

export default Users;
