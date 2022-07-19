import * as dotenv from "dotenv";
import * as Joi from "joi";
import * as path from "path";
import { IProcessEnv } from "./environment";

dotenv.config({ path: path.resolve(process.cwd(), ".env.default") });
dotenv.config({ override: true });

(function validateEnvironment(): void {
  const envSchema = Joi.object<IProcessEnv>({
    EMAIL_TEMPLATE_BUCKET_NAME: Joi.string().required(),
  }).unknown(true);

  const validationRes = envSchema.validate(process.env);
  if (validationRes.error) {
    console.error("Environment variable error");
    throw validationRes.error;
  }
})();
