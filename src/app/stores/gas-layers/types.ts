export interface LayoutTypes {
  'line-join'?: string;
  'line-cap'?: string;
  'text-field'?: string;
  'text-font'?: string[];
  'text-size'?: number;
}

export interface PaintTypes {
  'icon-color'?: string;
  'line-color'?: string;
  'line-width'?: number;
  'line-dasharray'?: Array<number>;
  'circle-color'?: string;
  'circle-radius'?: number;
  'circle-stroke-color'?: string;
  'circle-stroke-width'?: number;
}

export interface StylerStateTypes {
  minzoomLevels?: { [index: string]: number };
  layouts?: { [index: string]: LayoutTypes };
  paints?: { [index: string]: PaintTypes };
}
