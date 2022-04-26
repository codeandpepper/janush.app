import { VFC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { Button, Variant } from "@components/Button/Button";
import { ListElement } from "@components/ListElement/ListElement";
import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import UsersTable from "../../Users/UsersTable/UsersTable";

import { Paths } from "@routing/paths";
import { Group } from "@janush-types/group";
import { User } from "@janush-types/user";

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

interface LocationState {
  group: Group;
}

const GroupDetails: VFC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  // TODO: change to get group data from backend
  const { group } = location.state as LocationState;

  const onTableRowClick = (user: User) => {
    navigate(`${Paths.USERS_ADMINISTRATION_USERS_PATH}/${user.id}`, {
      state: { user },
    });
  };

  return (
    <UsersAdministrationLayout
      onBackClick={() => navigate(-1)}
      buttons={
        <>
          <Button sx={{ mr: 2 }}>Edit group</Button>
          <Button sx={{ mr: 2 }} variant={Variant.Outlined}>
            Remove user
          </Button>
          <Button sx={{ mr: 2 }}>Delete group</Button>
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
        <Box px={2} pt={1} pb={4} boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)">
          <ListElement label="Name" value={group.name} />
          <ListElement label="Description" value={group.description} />
          <ListElement label="Group role" value="xxxxxxx" />
          <ListElement label="Members" value={String(group.members)} />
          <ListElement label="Last Modified" value={group.lastModified} />
          <ListElement label="Created" value="16-06-2021" />
        </Box>
        <UsersTable data={data} onRowClick={onTableRowClick} />
      </Box>
    </UsersAdministrationLayout>
  );
};

export default GroupDetails;
