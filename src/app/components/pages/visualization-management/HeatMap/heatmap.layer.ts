import { Map as AppMap, MapMouseEvent } from 'maplibre-gl';

const styleUrl = '/public/assets/data/heat_map_test.json';
export const heatmapSource = 'heat-map-layers';
export const heatmapLayerPrefix = 'heat_map_sample';

export async function addHeatMap(map: AppMap) {
  if (!map || !map.getStyle()) return;
  const source = map.getSource(heatmapSource);
  if (!source) map.addSource(heatmapSource, { type: 'geojson', data: styleUrl });
  await addLayers();

  function addLayers() {
    return new Promise((resolve) => {
      map.addLayer({
          id: `${heatmapLayerPrefix}_heatmap`,
          type: 'heatmap',
          source: heatmapSource,
          paint: {
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'scale'],
              0, 0, 1, 1
            ],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1, 9, 3,
            ],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)',
            ],
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 2, 9, 20,
            ],
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              9, 1, 12, 0,
            ],
          },
        },
      );

      map.addLayer({
          id: `${heatmapLayerPrefix}_point`,
          type: 'circle',
          source: heatmapSource,
          minzoom: 7,
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10, ['interpolate', ['linear'], ['get', 'scale'], 0.5, 1],
              16, ['interpolate', ['linear'], ['get', 'scale'], 0.5, 10],
            ],
            'circle-color': ['get', 'color'],
            'circle-stroke-color': ['get', 'color'],
            'circle-stroke-width': 1,
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7, 0, 8, 1,
            ],
          },
        },
      );

      resolve({ success: true });
    });
  }
}
