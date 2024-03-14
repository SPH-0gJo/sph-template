export interface UploadGeoFile {
  name: string;
  fileSize: string;
  columns?: string[];
  featureType?: string;
  fileIndex?: number;
}

export interface UploadGeoFiles {
  files: UploadGeoFile[];
}
