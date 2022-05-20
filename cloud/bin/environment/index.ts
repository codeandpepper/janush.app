import * as dotenv from "dotenv";
import * as Joi from "joi";
import { IProcessEnv } from "./environment";

dotenv.config();

(function validateEnvironment(): void {
  const envSchema = Joi.object<IProcessEnv>({
    IDENTITY_PROVIDER_FACEBOOK_CLIENT_ID: Joi.string().required(),
    IDENTITY_PROVIDER_FACEBOOK_CLIENT_SECRET: Joi.string().required(),
    IDENTITY_PROVIDER_GOOGLE_CLIENT_ID: Joi.string().required(),
    IDENTITY_PROVIDER_GOOGLE_CLIENT_SECRET: Joi.string().required(),
    IDENTITY_PROVIDER_APPLE_CLIENT_ID: Joi.string().required(),
    IDENTITY_PROVIDER_APPLE_KEY_ID: Joi.string().required(),
    IDENTITY_PROVIDER_APPLE_PRIVATE_KEY: Joi.string().required(),
    IDENTITY_PROVIDER_APPLE_TEAM_ID: Joi.string().required(),
    USER_POOL_REDIRECT_SIGN_IN: Joi.string().uri().optional(),
    USER_POOL_REDIRECT_SIGN_OUT: Joi.string().uri().optional(),
  }).unknown(true);

  const validationRes = envSchema.validate(process.env);
  if (validationRes.error) {
    console.error("Missing environment variable");
    throw validationRes.error;
  }
})();
