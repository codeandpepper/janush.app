import { useState, VFC, FC } from "react";

import { Button } from "@components/Button/Button";
import { ConfirmationDialog } from "@components/ConfirmationDialog/ConfirmationDialog";
import { ListElement } from "@components/ListElement/ListElement";
import { User } from "@janush-types/user";
import { UsersAdministrationLayout } from "@layouts/UsersAdministrationLayout/UsersAdministrationLayout";
import { Box, Typography, Theme, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AddToGroupModal } from "@routing/routes/UsersAdministration/Groups/Modals/AddToGroupModal/AddToGroupModal";
import { rgbaColors } from "@themes/palette";
import { useLocation, useNavigate } from "react-router-dom";

import { UserModal, UserModalVariant } from "../Modals/UserModal/UserModal";

interface LocationState {
  user: User;
}

const ButtonWrapper: FC<ButtonProps> = ({ children, ...buttonProps }) => (
  <Button sx={{ mr: 2 }} {...buttonProps}>
    {children}
  </Button>
);

const UserDetails: VFC = () => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  const location = useLocation();
  // TODO: change to get user data from backend
  const { user } = location.state as LocationState;

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] = useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);

  return (
    <UsersAdministrationLayout
      onBackClick={() => navigate(-1)}
      buttons={
        <>
          <ButtonWrapper onClick={() => setIsEditUserModalOpen(true)}>
            Edit
          </ButtonWrapper>
          <ButtonWrapper onClick={() => setIsAddToGroupModalOpen(true)}>
            Add to group
          </ButtonWrapper>
          {/* TODO: Handle enable button while implementing backend */}
          <ButtonWrapper disabled>Enable</ButtonWrapper>
          {/* TODO: Handle disable button while implementing backend */}
          <ButtonWrapper>Disable</ButtonWrapper>
          <ButtonWrapper onClick={() => setIsRemoveUserModalOpen(true)}>
            Remove
          </ButtonWrapper>
        </>
      }
    >
      <Box
        px={2}
        pt={1}
        pb={4}
        boxShadow={`0px 4px 4px ${rgbaColors.grey.lightest}`}
      >
        <Typography
          fontSize={14}
          fontWeight={600}
          lineHeight={theme.spacing(3)}
          mb={2.25}
        >
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
      <UserModal
        isOpen={isEditUserModalOpen}
        onModalClose={() => setIsEditUserModalOpen(false)}
        variant={UserModalVariant.Edit}
      />
      <AddToGroupModal
        isOpen={isAddToGroupModalOpen}
        onModalClose={() => setIsAddToGroupModalOpen(false)}
      />
      <ConfirmationDialog
        isOpen={isRemoveUserModalOpen}
        onCancelClick={() => setIsRemoveUserModalOpen(false)}
        // TODO: Add function for submitting behavior while backend implementation
        onSubmit={() => null}
        submitButtonTitle="Remove user"
      >
        <ConfirmationDialog.Title>Removing user</ConfirmationDialog.Title>
        <ConfirmationDialog.Content>
          Are you sure you want to remove this user?
        </ConfirmationDialog.Content>
      </ConfirmationDialog>
    </UsersAdministrationLayout>
  );
};

export default UserDetails;
