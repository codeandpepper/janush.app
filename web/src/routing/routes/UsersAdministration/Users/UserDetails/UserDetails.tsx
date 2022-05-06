import { useState, VFC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import { ListElement } from "@components/ListElement/ListElement";
import { Button } from "@components/Button/Button";
import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";
import { rgbaColors } from "@themes/palette";
import { EditUserModal } from "../Modals/EditUserModal/EditUserModal";
import { AddToGroupModal } from "@routing/routes/UsersAdministration/Groups/Modals/AddToGroupModal/AddToGroupModal";
import { User } from "@janush-types/user";

interface LocationState {
  user: User;
}

const UserDetails: VFC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  // TODO: change to get user data from backend
  const { user } = location.state as LocationState;

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddToGroupModal, setShowAddToGroupModal] = useState(false);
  const [showRemovingUserModal, setShowRemovingUserModal] = useState(false);

  return (
    <UsersAdministrationLayout
      onBackClick={() => navigate(-1)}
      buttons={
        <>
          <Button sx={{ mr: 2 }} onClick={() => setShowEditUserModal(true)}>
            Edit
          </Button>
          <Button sx={{ mr: 2 }} onClick={() => setShowAddToGroupModal(true)}>
            Add to group
          </Button>
          <Button sx={{ mr: 2 }} disabled>
            Enable
          </Button>
          <Button sx={{ mr: 2 }}>Disable</Button>
          <Button sx={{ mr: 2 }} onClick={() => setShowRemovingUserModal(true)}>
            Remove
          </Button>
        </>
      }
    >
      <Box
        px={2}
        pt={1}
        pb={4}
        boxShadow={`0px 4px 4px ${rgbaColors.grey.lightest}`}
      >
        <Typography fontSize={14} fontWeight={600} lineHeight="24px" mb={2.25}>
          Account Details
        </Typography>
        <ListElement label="ID" value={user.id} />
        <ListElement label="Email" value={user.email} />
        <ListElement label="Phone number" value={user.phoneNumber} />
        <ListElement label="Password" value="xxxxxxx" />
        <ListElement
          label="Status"
          value={user.status ? "Verified" : "Unverified"}
        />
        <ListElement
          label="Access"
          value={user.access ? "Enabled" : "Disabled"}
        />
        <ListElement label="Last Modified" value={user.lastModified} />
        {/* TODO: set value from server */}
        <ListElement label="Created" value="16-06-2021" />
      </Box>
      <EditUserModal
        showModal={showEditUserModal}
        closeModal={() => setShowEditUserModal(false)}
      />
      <AddToGroupModal
        showModal={showAddToGroupModal}
        closeModal={() => setShowAddToGroupModal(false)}
      />
      <ConfirmationModal
        title="Removing user"
        showModal={showRemovingUserModal}
        closeModal={() => setShowRemovingUserModal(false)}
        onSubmit={() => null}
      >
        Are you sure You want to remove this user?
      </ConfirmationModal>
    </UsersAdministrationLayout>
  );
};

export default UserDetails;
