/*
 To-Do: Implement a method to validate a geojson file
 */
export function validateGeojson(geoJSONObject: object) {
  if (!isObject(geoJSONObject)) return false;
  return true;

  function isObject(object: object) {
    return object === Object(object);
  }
}
