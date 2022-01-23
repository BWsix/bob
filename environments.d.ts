// https://stackoverflow.com/a/53981706/16497018

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GITHUB_CALLBACK_URL: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      GOOGLE_CALLBACK_URL: string;

      DATABASE_URL: string;

      DETA_PROJECT_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
