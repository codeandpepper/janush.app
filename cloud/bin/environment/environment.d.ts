export interface IProcessEnv {
  EMAIL_TEMPLATE_BUCKET_NAME: string;
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends IProcessEnv {}
  }
}

export {};
