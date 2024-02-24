// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEOLAB_VECTOR_TILE_STYLE: string;
  readonly VITE_GEOSERVER_WMS_REQUEST_URL: string;
  readonly VITE_MAP_TILER_KEY: string;
  readonly VITE_NO_IMAGE: string;
  readonly VITE_OPEN_API_KEY: string;
  readonly VITE_VWORLD_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
