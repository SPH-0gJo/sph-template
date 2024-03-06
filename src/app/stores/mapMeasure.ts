import { Feature, FeatureCollection, LineString } from 'geojson';
import { measureTypes } from 'shared/constants/types/types';
import { create } from 'zustand';

interface MapMeasureState {
  measureType: measureTypes;
  distanceSource: FeatureCollection;
  distanceLayer: Feature<LineString>;
  distanceValue: Array<number>;
  areaSource: FeatureCollection;
  areaLayer: Feature<LineString>;
  areaValue: number;
  setMeasureType: (measure: measureTypes) => void;
  setDistanceSource: (source: FeatureCollection | null) => void;
  setDistanceLayer: (layer: Feature<LineString> | null) => void;
  setDistanceValue: (value: Array<number>) => void;
  setAreaSource: (source: FeatureCollection | null) => void;
  setAreaLayer: (layer: Feature<LineString> | null) => void;
  setAreaValue: (value: number) => void;
}

export const useMapMeasureStore = create<MapMeasureState>()((set, get) => ({
  measureType: 'none',
  distanceSource: {
    type: 'FeatureCollection',
    features: [],
  },
  distanceLayer: {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [] },
    properties: {},
  },
  distanceValue: [],
  areaSource: {
    type: 'FeatureCollection',
    features: [],
  },
  areaLayer: {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [] },
    properties: {},
  },
  areaValue: 0,
  setMeasureType: (measure: measureTypes) => {
    const current = get().measureType;
    const changed = current === measure ? 'none' : measure;
    set({ measureType: changed });
  },
  setDistanceSource: (source) => {
    const init: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };

    if (source === null) set({ distanceSource: init });
    else set({ distanceSource: source });
  },
  setDistanceLayer: (layer) => {
    const init: Feature<LineString> = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [] },
      properties: {},
    };

    if (layer === null) set({ distanceLayer: init });
    else set({ distanceLayer: layer });
  },
  setDistanceValue: (distanceValue) => set({ distanceValue: distanceValue }),
  setAreaSource: (source) => {
    const init: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };

    if (source === null) set({ areaSource: init });
    else set({ areaSource: source });
  },
  setAreaLayer: (layer) => {
    const init: Feature<LineString> = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [] },
      properties: {},
    };

    if (layer === null) set({ areaLayer: init });
    else set({ areaLayer: layer });
  },
  setAreaValue: (areaValue) => set({ areaValue: areaValue }),
}));
