import React from "react";

import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import GroupsTable from "./GroupsTable/GroupsTable";
import { Group } from "@janush-types/group";
import { Button } from "@components/Button/Button";

const data: Group[] = [
  {
    id: "1c4a9a8d-b652-421a-b130-9ad680029521",
    name: "Group0001",
    description: "Admins",
    members: 1,
    lastModified: "15-06-2021",
  },
  {
    id: "1c4a9a8d-b652-421a-b130-9ad680029522",
    name: "Group0002",
    description: "Moderators",
    members: 3,
    lastModified: "15-06-2021",
  },
];

const Groups: React.VFC = () => {
  return (
    <UsersAdministrationLayout
      buttons={<Button sx={{ mr: 2 }}>New Group</Button>}
    >
      <GroupsTable data={data} />
    </UsersAdministrationLayout>
  );
};

export default Groups;
