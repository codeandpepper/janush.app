import { useState, VFC } from "react";

import { Button } from "@components/Button/Button";
import { ConfirmationDialog } from "@components/ConfirmationDialog/ConfirmationDialog";
import { ListElement } from "@components/ListElement/ListElement";
import { Group } from "@janush-types/group";
import { User } from "@janush-types/user";
import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import { Box } from "@mui/material";
import { Paths } from "@routing/paths";
import UsersTable from "@routing/routes/UsersAdministration/Users/UsersTable/UsersTable";
import { rgbaColors } from "@themes/palette";
import { useLocation, useNavigate } from "react-router-dom";

import { GroupModal, GroupModalVariant } from "../Modals/GroupModal/GroupModal";

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

interface LocationState {
  group: Group;
}

const GroupDetails: VFC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  // TODO: change to get group data from backend
  const { group } = location.state as LocationState;

  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);

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
          <Button sx={{ mr: 2 }} onClick={() => setIsEditGroupModalOpen(true)}>
            Edit group
          </Button>
          {/* TODO: Handle removing user while implementing backend */}
          <Button sx={{ mr: 2 }} disabled>
            Remove user
          </Button>
          <Button
            sx={{ mr: 2 }}
            onClick={() => setIsDeleteGroupModalOpen(true)}
          >
            Delete group
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
        <Box
          px={2}
          pt={1}
          pb={4}
          boxShadow={`0px 4px 4px ${rgbaColors.grey.lightest}`}
        >
          <ListElement label="Name" value={group.name} />
          <ListElement label="Description" value={group.description} />
          <ListElement label="Group role" value="xxxxxxx" />
          <ListElement label="Members" value={String(group.members)} />
          <ListElement label="Last Modified" value={group.lastModified} />
          <ListElement label="Created" value="16-06-2021" />
        </Box>
        <UsersTable data={data} onRowClick={onTableRowClick} />
      </Box>
      <GroupModal
        isOpen={isEditGroupModalOpen}
        onModalClose={() => setIsEditGroupModalOpen(false)}
        variant={GroupModalVariant.Edit}
      />
      <ConfirmationDialog
        isOpen={isDeleteGroupModalOpen}
        onCancelClick={() => setIsDeleteGroupModalOpen(false)}
        // TODO: Add function for submitting behavior while backend implementation
        onSubmit={() => null}
        submitButtonTitle="Remove user"
      >
        <ConfirmationDialog.Title>Deleting group</ConfirmationDialog.Title>
        <ConfirmationDialog.Content>
          Are you sure you want to delete this group?
        </ConfirmationDialog.Content>
      </ConfirmationDialog>
    </UsersAdministrationLayout>
  );
};

export default GroupDetails;
