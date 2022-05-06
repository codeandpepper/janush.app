import { VFC } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Typography, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { FormInput } from "@components/FormInput/FormInput";
import { Select } from "@components/Select/Select";
import { FormModalLayout } from "@layouts/Modals/FormModalLayout/FormModalLayout";

const groupRoleOptions = [
  { name: "groupRole1", label: "GroupRole1" },
  { name: "groupRole2", label: "GroupRole2" },
  { name: "groupRole3", label: "GroupRole3" },
];

const baseSchema = {
  firstName: yup.string().max(30).required().label("First name"),
  lastName: yup.string().max(30).required().label("Last name"),
};

const emailSchema = yup.object({
  ...baseSchema,
  email: yup.string().email().required().label("Email address"),
});

interface FormData {
  name: string;
  description: string;
  groupRole: string;
}

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const CreateGroupModal: VFC<Props> = ({ showModal, closeModal }) => {
  const theme = useTheme<Theme>();

  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(emailSchema),
    defaultValues: {
      name: "",
      description: "",
      groupRole: "groupRole1",
    },
  });

  return (
    <FormModalLayout
      showModal={showModal}
      closeModal={closeModal}
      title="Create group"
      buttonTitle="Create group"
      isButtonDisabled={false}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Name"
            onChange={field.onChange}
            errorMessage={formState.errors.name?.message}
            autoFocus
            sx={{ mt: 2.1, mb: 2 }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Description (optional)"
            onChange={field.onChange}
            errorMessage={formState.errors.description?.message}
            sx={{ mb: 4 }}
          />
        )}
      />
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Typography color={theme.palette.secondary.dark}>
          Select a group role
        </Typography>
        <Controller
          name="groupRole"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              options={groupRoleOptions}
              sx={{
                width: 164,
                "& .MuiSelect-select": {
                  pl: 2,
                },
                "& .MuiSvgIcon-root": {
                  mr: 1.5,
                },
              }}
            />
          )}
        />
      </Box>
    </FormModalLayout>
  );
};
