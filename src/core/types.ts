// Geo

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface ILatLngPolygon {
  outer: ILatLng[];
  inner?: ILatLng[];
}

// Bussines

export interface IDeputy {
  id: string;
  name?: string;
  schedule?: string;
  address?: string;
  fb?: string;
  twitter?: string;
  phones?: string[];
  photos?: string[];
}

export interface IDeputysMap {
  [key: string]: IDeputy;
}

export interface IConstituency {
  id: string;
  number: number;
  deputies: string[];
  markers: ILatLng[];
  stations: IConstituencyStation[];
  polygons: ILatLngPolygon[];
}

export interface IConstituencyStation {
  id: number;
  addresses?: string;
  numberOfVoters: number;
}
