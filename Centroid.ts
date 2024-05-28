import * as turf from '@turf/turf';
import { Feature, Polygon, MultiPolygon } from 'geojson';

// Function to calculate the centroid of the longest ring in a polygon or multipolygon
export const calculateMainCentroid = (feature: Feature<Polygon | MultiPolygon>): [number, number] => {
  let longestRing: number[][] = [];
  let maxLength = 0;

  const calculateLength = (coords: number[][]) => {
    const lineString = turf.lineString(coords);
    const length = turf.length(lineString);
    return length;
  };

  const findLongestRing = (coords: number[][][]) => {
    coords.forEach(ring => {
      const length = calculateLength(ring);
      if (length > maxLength) {
        maxLength = length;
        longestRing = ring;
      }
    });
  };

  if (feature.geometry.type === 'Polygon') {
    findLongestRing(feature.geometry.coordinates);
  } else if (feature.geometry.type === 'MultiPolygon') {
    feature.geometry.coordinates.forEach(polygon => findLongestRing(polygon));
  }

  const longestRingFeature = turf.polygon([longestRing]);
  const centroid = turf.centroid(longestRingFeature).geometry.coordinates as [number, number];

  return centroid;
};
