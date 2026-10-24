/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Override the API origin, e.g. http://localhost:8787 during local work. */
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
