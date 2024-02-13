export interface SubMenu {
  name: string;
  summary: string;
  link: string;
  image: string;
}

export interface MainMenu {
  id: string;
  name: string;
  children?: SubMenu[];
}

export type measureTypes = 'none' | 'distance' | 'radius' | 'area';

export interface MonitoringMenu {
  id: number;
  name: string;
  image: string;
}

export type LayerStyleProperty = string | number | number[] | object | null;

export interface LayerStyle {
  'line-color'?: string;
  'line-width'?: number;
  'line-dasharray'?: Array<number>;
}

export type ImageExtent = [[number, number], [number, number], [number, number], [number, number]];

export interface WMSRequest {
  SERVICE?: string;
  VERSION?: string;
  REQUEST?: 'GetMap' | 'GetFeatureInfo';
  FORMAT?: string;
  TRANSPARENT?: string;
  LAYERS?: string;
  SRS?: string;
  CRS?: string;
  WIDTH?: number;
  HEIGHT?: number;
  BBOX?: string;
  TILED?: boolean;
}
