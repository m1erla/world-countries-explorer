export interface Country {
  name: string;
  capital: string;
  population: number;
  continent: string;
  languages: string[];
  flag: string;
  area: number;
  currencies: string[];
  timezones: string[];
  currency: {
    name: string;
    code: string;
    symbol: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
} 