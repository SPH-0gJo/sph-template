export interface ColumnHeader {
  header: string;
  column: string;
}

export interface Headers {
  headers: ColumnHeader[];
}

export interface DataTableOptions {
  columns: Headers;
}
