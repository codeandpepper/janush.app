export interface IProcessEnv {
  REACT_APP_IDENTITY_POOL_ID: string;
  REACT_APP_REGION: string;
  REACT_APP_USER_POOL_ID: string;
  REACT_APP_USER_POOL_WEB_CLIENT_ID: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends IProcessEnv {}
  }
}

export {};
