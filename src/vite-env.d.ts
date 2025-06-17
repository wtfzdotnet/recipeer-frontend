/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITEST: boolean;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
