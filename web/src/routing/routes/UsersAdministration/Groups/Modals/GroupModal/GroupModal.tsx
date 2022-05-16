import { VFC } from "react";

import { FormInput } from "@components/FormInput/FormInput";
import { Select } from "@components/Select/Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormModalLayout } from "@layouts/Modals/FormModalLayout/FormModalLayout";
import { Box, Typography, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { emailSchema } from "@validations/UserValidation";
import { useForm, Controller } from "react-hook-form";

export enum GroupModalVariant {
  Create = "create",
  Edit = "edit",
}

const groupRoleOptions = [
  { name: "groupRole1", label: "GroupRole1" },
  { name: "groupRole2", label: "GroupRole2" },
  { name: "groupRole3", label: "GroupRole3" },
];

interface FormData {
  name: string;
  description: string;
  groupRole: string;
}

interface Props {
  variant: GroupModalVariant;
  isOpen: boolean;
  onModalClose: () => void;
}

export const GroupModal: VFC<Props> = ({ variant, ...restProps }) => {
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
      title={
        variant === GroupModalVariant.Create ? "Create group" : "Edit group"
      }
      buttonTitle={
        variant === GroupModalVariant.Create ? "Create group" : "Save changes"
      }
      isButtonDisabled={false}
      {...restProps}
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
            sx={{ mb: 2 }}
          />
        )}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        mt={2}
      >
        <Typography color={theme.palette.secondary.dark}>
          {variant === GroupModalVariant.Create
            ? "Select a group role"
            : "Group role"}
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
