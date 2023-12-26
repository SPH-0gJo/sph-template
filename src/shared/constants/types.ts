export interface SubMenu {
  name: string;
  summary: string;
}

export interface MainMenu {
  id: string;
  name: string;
  children?: SubMenu[];
}
