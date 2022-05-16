import { VFC, useState } from "react";

import { Button } from "@components/Button/Button";
import { Group } from "@janush-types/group";
import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";

import GroupsTable from "./GroupsTable/GroupsTable";
import { GroupModal, GroupModalVariant } from "./Modals/GroupModal/GroupModal";

// TODO: Remove it after getting data from backend
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

const Groups: VFC = () => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  return (
    <UsersAdministrationLayout
      buttons={
        <Button sx={{ mr: 2 }} onClick={() => setIsCreateGroupModalOpen(true)}>
          New Group
        </Button>
      }
    >
      <GroupsTable data={data} />
      <GroupModal
        isOpen={isCreateGroupModalOpen}
        onModalClose={() => setIsCreateGroupModalOpen(false)}
        variant={GroupModalVariant.Create}
      />
    </UsersAdministrationLayout>
  );
};

export default Groups;
