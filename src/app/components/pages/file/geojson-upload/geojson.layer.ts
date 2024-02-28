import { Map as AppMap } from 'maplibre-gl';

export async function addGeoJsonMap(map: AppMap, styleUrl: string, fileName: string) {
  if (!map || !map.getStyle()) return;
  await addLayers();

  function addLayers() {
    return new Promise((resolve) => {
      map.addSource(fileName, {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: styleUrl,
      });
      resolve({ success: true });
    });
  }
}
