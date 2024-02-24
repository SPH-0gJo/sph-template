const { VITE_MAP_TILER_KEY } = import.meta.env;
export const vectorTileBaseMaps = [
  {
    name: 'streets',
    style: `https://api.maptiler.com/maps/streets/style.json?key=${VITE_MAP_TILER_KEY}`,
  },
  // {
  //   name: 'streetsV2',
  //   style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${VITE_MAP_TILER_KEY}`,
  // },
  // {
  //   name: 'basic-v2',
  //   style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${VITE_MAP_TILER_KEY}`,
  // },
  {
    name: 'hybrid',
    style: `https://api.maptiler.com/maps/hybrid/style.json?key=${VITE_MAP_TILER_KEY}`,
  },
  {
    name: 'light gray',
    style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${VITE_MAP_TILER_KEY}`,
  },
  {
    name: 'dark gray',
    style: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${VITE_MAP_TILER_KEY}`,
  },
];
