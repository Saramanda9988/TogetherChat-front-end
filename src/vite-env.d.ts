/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_WS_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
