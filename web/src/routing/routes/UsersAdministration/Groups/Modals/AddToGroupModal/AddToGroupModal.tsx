import { VFC } from "react";

import { Select } from "@components/Select/Select";
import { FormModalLayout } from "@layouts/Modals/FormModalLayout/FormModalLayout";
import { Box, Typography, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";

const groupOptions = [
  { name: "group1", label: "Group1" },
  { name: "group2", label: "Group2" },
  { name: "group3", label: "Group3" },
];

interface FormData {
  group: string;
}

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
}

export const AddToGroupModal: VFC<Props> = ({ ...props }) => {
  const theme = useTheme<Theme>();

  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      group: "group1",
    },
  });

  return (
    <FormModalLayout title="Add user" buttonTitle="Add to group" {...props}>
      <Typography color={theme.palette.primary.main}>
        b.szurek@codeandpepper.com
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        mt={2.75}
      >
        <Typography color={theme.palette.secondary.dark}>Group</Typography>
        <Controller
          name="group"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              options={groupOptions}
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
