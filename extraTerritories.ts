import { Feature } from 'geojson';

const newTerritories: Feature[] = [
  {
    type: "Feature",
    properties: {
      sovereignt: "Norway",
      admin: "Svalbard",
      name: "Svalbard",
      type: "Dependency"
    },
    geometry: {
      type: "Point",
      coordinates: [-21.0, 77.9] 
    }
  },
];

export default newTerritories;
