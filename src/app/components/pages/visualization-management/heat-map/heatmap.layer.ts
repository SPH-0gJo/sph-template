import PointPopup from 'app/components/pages/visualization-management/heat-map/PointPopup';
import { Map as AppMap, MapGeoJSONFeature } from 'maplibre-gl';

const styleUrl = '/src/shared/fixtures/heat_map_data.json';

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
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'scale'], 0, 0, 1, 1],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 11, 2],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            `${legendGroups[0]}`,
            0.2,
            `${legendGroups[1]}`,
            0.4,
            `${legendGroups[2]}`,
            0.6,
            `${legendGroups[3]}`,
            0.8,
            `${legendGroups[4]}`,
            1,
            `${legendGroups[5]}`,
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 9, 1, 12, 0.8],
        },
      });

      map.addLayer({
        id: `${heatmapLayerPrefix}_point`,
        type: 'circle',
        source: heatmapSource,
        minzoom: 14,
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            ['interpolate', ['linear'], 0.5, 0.5, 1],
            16,
            ['interpolate', ['linear'], 1, 0.5, 10],
          ],
          'circle-color': 'rgba(209,229,240,0.8)',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
        },
      });

      map.on('click', `${heatmapLayerPrefix}_point`, (e) => {
        const { lng, lat } = e.lngLat as unknown as { lng: number; lat: number };
        const feature = e.features as unknown as MapGeoJSONFeature[];
        const properties = feature[0].properties as { stop_name: string };
        PointPopup({ map, lngLat: [lng, lat], properties });
      });

      resolve({ success: true });
    });
  }
}

export const heatmapLayerPrefix = 'heat_map_sample';

export const heatmapSource = 'heat-map-layers';

export const legendGroups: Array<string> = [
  'rgba(33,102,172,0)',
  'rgba(103,169,207)',
  'rgba(209,229,240)',
  'rgba(253,219,199)',
  'rgb(239,138,98)',
  'rgb(178,24,43)',
];
