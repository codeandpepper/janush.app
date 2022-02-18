import { object, ref, SchemaOf, string } from "yup";

import { MAX_EMAIL_LENGTH } from "@consts/index";
import { passwordValidation } from "@utils/validation/passwordValidation";
import { validateMaxStringLength } from "@utils/validation/validateMaxStringLength";
import { SignUpFormState } from "./formState";

export const formValidationSchema = (): SchemaOf<SignUpFormState> =>
  <SchemaOf<SignUpFormState>>object({
    email: string()
      .required("Email is a required field")
      .email("Email is not correct")
      .test("Maximum email length", (v) =>
        validateMaxStringLength(v, MAX_EMAIL_LENGTH)
      ),
    password: passwordValidation(),
    confirmPassword: string()
      .required("Password is a required field")
      .oneOf([ref("password"), null], "Passwords must match"),
  });