export interface GeolabMenu {
  id: number;
  is_deleted?: boolean;
  is_visible?: boolean;
  list_order?: number;
  parent_id?: number;
  link?: string;
  name: string;
  summary?: string;
  thumbnail?: string;
}
export interface GeolabMenuItems extends GeolabMenu {
  children?: GeolabMenu[];
}
export type ImageExtent = [[number, number], [number, number], [number, number], [number, number]];
export type LayerStyleProperty = string | number | number[] | object | null;
export type MeasureTypes = 'none' | 'distance' | 'radius' | 'area';
export interface MonitoringMenu {
  id: number;
  name: string;
  image: string;
}
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
