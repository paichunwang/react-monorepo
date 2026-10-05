export interface Location {
  lat: number;
  long: number;
  alt?: number;
}

export type CoordinatePair = [
  longitude: number,
  latitude: number,
  altitude?: number
];

export interface GeographicBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
