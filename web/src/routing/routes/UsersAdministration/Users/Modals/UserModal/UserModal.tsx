import { VFC } from "react";

import { FormInput } from "@components/FormInput/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormModalLayout } from "@layouts/Modals/FormModalLayout/FormModalLayout";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { emailSchema } from "@validations/UserValidation";
import { useForm, Controller } from "react-hook-form";

export enum UserModalVariant {
  Create = "create",
  Edit = "edit",
}

interface FormData {
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  password: string;
  shouldResendVerificationEmail: boolean;
  shouldResendInvitationEmail: boolean;
}

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  variant: UserModalVariant;
}

export const UserModal: VFC<Props> = ({ variant, ...restProps }) => {
  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      isEmailVerified: true,
      password: "",
      shouldResendVerificationEmail: false,
      shouldResendInvitationEmail: false,
    },
  });

  return (
    <FormModalLayout
      title={variant === UserModalVariant.Create ? "Create user" : "Edit user"}
      buttonTitle={
        variant === UserModalVariant.Create ? "Create user" : "Save changes"
      }
      isButtonDisabled={false}
      {...restProps}
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
      {variant === UserModalVariant.Edit && (
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Password"
              onChange={field.onChange}
              errorMessage={formState.errors.password?.message}
              type="password"
              sx={{ mt: 2 }}
            />
          )}
        />
      )}
      {variant === UserModalVariant.Create && (
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
      )}
      {variant === UserModalVariant.Edit && (
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
      )}
    </FormModalLayout>
  );
};
