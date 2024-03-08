import { ExpressionInputType } from '@maplibre/maplibre-gl-style-spec';
import { facilityManagementApi } from 'app/api/facility-management.api';
import { Point } from 'geojson';
import { GeoJSONSource } from 'mapbox-gl';
import maplibregl, {
  ExpressionSpecification,
  FilterSpecification,
  Map as AppMap,
  MapGeoJSONFeature,
} from 'maplibre-gl';
import { GEOLAB_VECTOR_TILE_STYLE, VALVE_CLASS_TYPES } from 'shared/constants/varibales';
import { ValveFormCodeTypes, valveFormTypes, valves as valveColorsForCode } from 'shared/fixtures/pipeline';

export async function addValveClusterLayers(map: AppMap) {
  const valves = await facilityManagementApi.valves();
  const sourceId = 'geolab-valve-clusters';
  if (!map || !map.getStyle()) return;
  const source = map.getSource(sourceId);
  if (source || !valves) return;
  map.addSource('geolab-layers', { type: 'vector', url: GEOLAB_VECTOR_TILE_STYLE });
  map.addSource(sourceId, {
    type: 'geojson',
    data: valves,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });
  const filter: FilterSpecification = ['has', 'point_count'];
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: sourceId,
    filter,
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#11C031', 750, '#EE3F3F'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  });
  map.addLayer({
    id: 'cluster-count-label',
    type: 'symbol',
    source: sourceId,
    filter,
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  });
  const paint: { 'line-color': string; 'line-width': number; 'line-dasharray'?: Array<number> } = {
    'line-color': '#13EC3B',
    'line-width': 1,
  };
  map.addLayer({
    id: 'gsf_pl_mt',
    type: 'line',
    source: 'geolab-layers',
    'source-layer': 'gsf_pl_mt',
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint,
    minzoom: 15,
  });
  const valveColorExpression = valveColorsForCode.map((e) => [e.code, e.color]).flat() as ExpressionInputType[];
  const circleColor = ['match', ['get', 'GIS_VV_TYP'], ...valveColorExpression, '#ccc'];
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: sourceId,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': circleColor as ExpressionSpecification,
      'circle-radius': 5,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  });

  map.on('click', 'clusters', async (e) => {
    const features: MapGeoJSONFeature[] = map.queryRenderedFeatures(e.point, {
      layers: ['clusters'],
    });
    const [feature] = features;
    const { cluster_id: clusterId } = feature.properties;
    const { coordinates: position } = feature.geometry as Point;
    const source = map.getSource(sourceId) as GeoJSONSource | undefined;
    if (!source) return;
    source.getClusterExpansionZoom(clusterId, (err: string, zoom: number) => {
      if (err || !position) return;
      map.easeTo({ center: [position[0], position[1]], zoom });
    });
  });

  map.on('click', 'unclustered-point', (e) => {
    if (!e.features) return;
    const [feature] = e.features;
    const { coordinates: coord } = feature.geometry as Point;
    // eslint-disable-next-line prefer-const
    let [x, y] = coord;
    const {
      VV_NO: valueId,
      GIS_VV_TYP: valveTypeCode,
      DRTN_ANGL: valveAngle,
      GIS_VV_FOR: valveFormType,
    } = feature.properties;
    const valveType = VALVE_CLASS_TYPES[valveTypeCode];
    while (Math.abs(e.lngLat.lng - x) > 180) x += e.lngLat.lng > x ? 360 : -360;
    const html = `
      번호&#58;&#09;${valueId}<br>
      유형&#58;&#09;${valveType}<br>
      각도&#58;&#09;${valveAngle}&#176;<br>
      형식&#58;&#09;${valveFormTypes[valveFormType as ValveFormCodeTypes]}<br>
    `;
    new maplibregl.Popup().setLngLat([x, y]).setHTML(html).addTo(map);
  });
}
