import Joi from "joi";
import { IProcessEnv } from "@janush-types/global";

export const configureEnv = (): void => {
  const envSchema = Joi.object<IProcessEnv>({
    REACT_APP_IDENTITY_POOL_ID: Joi.string().required(),
    REACT_APP_REGION: Joi.string().required(),
    REACT_APP_USER_POOL_ID: Joi.string().required(),
    REACT_APP_USER_POOL_WEB_CLIENT_ID: Joi.string().required(),
  }).unknown(true);

  const validationRes = envSchema.validate(process.env);
  if (validationRes.error) {
    console.error("Environment variable error");
    throw validationRes.error;
  }
};
