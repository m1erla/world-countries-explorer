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
  annualTourists: number;
  currency: {
    name: string;
    code: string;
    symbol: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  economicIndicators: {
    minimumWage: number; // Aylık asgari ücret (USD)
    averageSalary: number; // Aylık ortalama maaş (USD)
    unemploymentRate: number; // İşsizlik oranı (%)
  };
} 