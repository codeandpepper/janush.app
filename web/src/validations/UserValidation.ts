import * as yup from "yup";

export const baseSchema = {
  firstName: yup.string().max(30).required().label("First name"),
  lastName: yup.string().max(30).required().label("Last name"),
};

export const emailSchema = yup.object({
  ...baseSchema,
  email: yup.string().email().required().label("Email address"),
});
