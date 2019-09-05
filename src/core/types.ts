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

export interface IConstituencyStation {
  id: number;
  address?: string;
  numberOfVoters: number;
}

export interface IConstituency {
  id: string;
  number: number;
  deputies: string[];
  stations: IConstituencyStation[];
}
