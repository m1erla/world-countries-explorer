export interface Country {
  id: string;
  name: string;
  flag: string;
  capital: string;
  population: number;
  continent: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  languages: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
} 