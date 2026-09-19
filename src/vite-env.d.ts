/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_LOCATIONIQ_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
