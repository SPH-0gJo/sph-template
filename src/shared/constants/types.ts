export interface SubMenu {
  name: string;
  summary: string;
  link: string;
}

export interface MainMenu {
  id: string;
  name: string;
  children?: SubMenu[];
}

export type measureTypes = 'none' | 'distance' | 'radius' | 'area';
