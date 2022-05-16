import { useState, VFC } from "react";

import { Button } from "@components/Button/Button";
import { SearchIcon } from "@components/icons/SearchIcon/SearchIcon";
import { Select } from "@components/Select/Select";
import { User } from "@janush-types/user";
import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import { Box, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { rgbaColors } from "@themes/palette";
import { getOptionsFromEnum } from "@utils/getOptionsFromEnum/getOptionsFromEnum";
import { useNavigate } from "react-router-dom";

import { UserModal, UserModalVariant } from "./Modals/UserModal/UserModal";
import UsersTable from "./UsersTable/UsersTable";

enum SearchBy {
  ID = "id",
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

interface Search {
  searchBy: SearchBy;
  searchFor: string;
}

// TODO: Remove it after getting data from backend
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
  const [search, setSearch] = useState<Search>({
    searchBy: SearchBy.Email,
    searchFor: "",
  });
  const [status, setStatus] = useState<Status>(Status.All);
  const [access, setAccess] = useState<Access>(Access.All);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const navigate = useNavigate();

  const onTableRowClick = (user: User) => {
    navigate(user.id, { state: { user } });
  };

  return (
    <UsersAdministrationLayout
      buttons={
        <>
          <Button sx={{ mr: 2 }} onClick={() => setIsCreateUserModalOpen(true)}>
            Create user
          </Button>
          <Button sx={{ mr: 2 }} disabled>
            Add to group
          </Button>
          <Button sx={{ mr: 2 }} disabled>
            Enable
          </Button>
          <Button sx={{ mr: 2 }} disabled>
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
          boxShadow: `0px 2px 6px ${rgbaColors.grey.light}`,
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
              options={getOptionsFromEnum(SearchBy)}
              sx={{
                // TODO: Static width need to be removed while implementing RWD
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
                  // TODO: Static width need to be removed while implementing RWD
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
                options={getOptionsFromEnum(Status)}
                sx={{
                  // TODO: Static width need to be removed while implementing RWD
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
                options={getOptionsFromEnum(Access)}
                sx={{
                  // TODO: Static width need to be removed while implementing RWD
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
              component="span"
              fontWeight={600}
            >{`Showing ${data.length} of ${data.length}`}</Typography>
            {` (selected 0)`}
          </Typography>
        </Box>
        <UsersTable data={data} onRowClick={onTableRowClick} />
      </Box>
      <UserModal
        isOpen={isCreateUserModalOpen}
        onModalClose={() => setIsCreateUserModalOpen(false)}
        variant={UserModalVariant.Create}
      />
    </UsersAdministrationLayout>
  );
};

export default Users;
