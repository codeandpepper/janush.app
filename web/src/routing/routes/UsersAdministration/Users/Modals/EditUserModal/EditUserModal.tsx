import { VFC } from "react";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInput } from "@components/FormInput/FormInput";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
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
  password: string;
  shouldResendVerificationEmail: boolean;
  shouldResendInvitationEmail: boolean;
}

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const EditUserModal: VFC<Props> = ({ showModal, closeModal }) => {
  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      shouldResendVerificationEmail: false,
      shouldResendInvitationEmail: false,
    },
  });

  return (
    <FormModalLayout
      showModal={showModal}
      closeModal={closeModal}
      title="Edit user"
      buttonTitle="Save changes"
      isButtonDisabled={true}
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
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormInput
            label="Password"
            onChange={field.onChange}
            errorMessage={formState.errors.password?.message}
            type="password"
          />
        )}
      />
      <Box display="flex" flexDirection="column">
        <Controller
          name="shouldResendVerificationEmail"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox onChange={field.onChange} />}
              label="Resend verification email"
              sx={{
                ml: 1,
                mt: 2,
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
          )}
        />
        <Controller
          name="shouldResendInvitationEmail"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox onChange={field.onChange} />}
              label="Resend invitation email"
              sx={{
                ml: 1,
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                },
              }}
            />
          )}
        />
      </Box>
    </FormModalLayout>
  );
};
