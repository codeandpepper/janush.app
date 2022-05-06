import { VFC } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Checkbox, FormControlLabel } from "@mui/material";

import { FormInput } from "@components/FormInput/FormInput";
import { FormModalLayout } from "@layouts/Modals/FormModalLayout/FormModalLayout";

const baseSchema = {
  firstName: yup.string().max(30).required().label("First name"),
  lastName: yup.string().max(30).required().label("Last name"),
};

const emailSchema = yup.object({
  ...baseSchema,
  email: yup.string().email().required().label("Email address"),
});

interface FormData {
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
}

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const CreateUserModal: VFC<Props> = ({ showModal, closeModal }) => {
  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      isEmailVerified: true,
    },
  });

  return (
    <FormModalLayout
      showModal={showModal}
      closeModal={closeModal}
      title="Create user"
      buttonTitle="Create user"
      isButtonDisabled={false}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Email*"
            onChange={field.onChange}
            errorMessage={formState.errors.email?.message}
            autoFocus
            sx={{ mt: 2.1, mb: 2 }}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Phone Number"
            onChange={field.onChange}
            errorMessage={formState.errors.phoneNumber?.message}
          />
        )}
      />
      <Controller
        name="isEmailVerified"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox onChange={field.onChange} defaultChecked />}
            label="Mark email as verified"
            sx={{
              mt: 2,
              "& .MuiFormControlLabel-label": {
                fontSize: "12px",
              },
            }}
          />
        )}
      />
    </FormModalLayout>
  );
};
