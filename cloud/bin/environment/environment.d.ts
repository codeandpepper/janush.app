export interface IProcessEnv {
  IDENTITY_PROVIDER_FACEBOOK_CLIENT_ID: string;
  IDENTITY_PROVIDER_FACEBOOK_CLIENT_SECRET: string;
  IDENTITY_PROVIDER_GOOGLE_CLIENT_ID: string;
  IDENTITY_PROVIDER_GOOGLE_CLIENT_SECRET: string;
  IDENTITY_PROVIDER_APPLE_CLIENT_ID: string;
  IDENTITY_PROVIDER_APPLE_KEY_ID: string;
  IDENTITY_PROVIDER_APPLE_PRIVATE_KEY: string;
  IDENTITY_PROVIDER_APPLE_TEAM_ID: string;
  USER_POOL_REDIRECT_SIGN_IN?: string;
  USER_POOL_REDIRECT_SIGN_OUT?: string;
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends IProcessEnv {}
  }
}

export {};
