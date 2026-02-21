/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_ACCESS_TOKEN: string;
  readonly PUBLIC_SITE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
