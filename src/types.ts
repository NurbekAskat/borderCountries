export interface country {
  name: string;
  alphaCode: string;
}

export interface ApiCountry {
  name: string;
  alpha3Code: string;
}

export interface alphaCountry {
  name: string;
  alphaCode: string;
  capital: string;
  population: number;
  borders: string[];
  flag: string;
}
