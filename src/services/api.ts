import type { Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1/all?fields=name,flags`";

// Önbellekleme için değişken ve localStorage anahtarları
const CACHE_KEY = 'countries_cache';
const CACHE_TIMESTAMP_KEY = 'countries_cache_timestamp';
const CACHE_DURATION = 1000 * 60 * 60; // 1 saat

const mapRegionToContinent = (region: string, subregion: string): string => {
  if (region === "Americas") {
    if (subregion.includes("South")) {
      return "South America";
    } else if (subregion.includes("North")) {
      return "North America";
    } else if (subregion.includes("Central")) {
      return "North America";
    } else {
      return "North America"; // Varsayılan olarak North America
    }
  }
  
  switch (region) {
    case "Antarctic":
      return "Antarctica";
    case "Asia":
      return "Asia";
    case "Europe":
      return "Europe";
    case "Africa":
      return "Africa";
    case "Oceania":
      return "Oceania";
    default:
      return region;
  }
};

const loadFromLocalStorage = (): { cache: Country[] | null; timestamp: number | null } => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    return {
      cache: cache ? JSON.parse(cache) : null,
      timestamp: timestamp ? parseInt(timestamp) : null
    };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return { cache: null, timestamp: null };
  }
};

const saveToLocalStorage = (data: Country[], timestamp: number) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getTouristData = (countryName: string): number => {
  // Örnek turist verileri
  const touristData: { [key: string]: number } = {
    Turkey: 51.2e6, // 51.2 milyon
    France: 89.4e6,
    Spain: 83.7e6,
    "United States": 79.3e6,
    China: 65.7e6,
  };
  return touristData[countryName] || Math.floor(Math.random() * 20e6) + 1e6;
};

const getEconomicData = (countryName: string): { minimumWage: number; averageSalary: number; unemploymentRate: number } => {
  // Örnek ekonomik veriler (USD cinsinden)
  const economicData: { [key: string]: { minimumWage: number; averageSalary: number; unemploymentRate: number } } = {
    Turkey: {
      minimumWage: 614,
      averageSalary: 1250,
      unemploymentRate: 9.4
    },
    "United States": {
      minimumWage: 1256,
      averageSalary: 5783,
      unemploymentRate: 3.7
    },
    Germany: {
      minimumWage: 1584,
      averageSalary: 4350,
      unemploymentRate: 5.7
    },
    Japan: {
      minimumWage: 1600,
      averageSalary: 3800,
      unemploymentRate: 2.6
    },
    "United Kingdom": {
      minimumWage: 1752,
      averageSalary: 3900,
      unemploymentRate: 4.2
    },
    France: {
      minimumWage: 1709,
      averageSalary: 3720,
      unemploymentRate: 7.1
    },
    Canada: {
      minimumWage: 1900,
      averageSalary: 4200,
      unemploymentRate: 5.0
    },
    Australia: {
      minimumWage: 2230,
      averageSalary: 4900,
      unemploymentRate: 3.7
    },
    Spain: {
      minimumWage: 1167,
      averageSalary: 2500,
      unemploymentRate: 11.8
    },
    Italy: {
      minimumWage: 1100,
      averageSalary: 2800,
      unemploymentRate: 7.4
    },
    Netherlands: {
      minimumWage: 1725,
      averageSalary: 4100,
      unemploymentRate: 3.6
    },
    Sweden: {
      minimumWage: 0, // İsveç'te yasal asgari ücret yok
      averageSalary: 4400,
      unemploymentRate: 7.2
    },
    Switzerland: {
      minimumWage: 3800,
      averageSalary: 6400,
      unemploymentRate: 2.0
    },
    China: {
      minimumWage: 370,
      averageSalary: 1290,
      unemploymentRate: 5.2
    },
    India: {
      minimumWage: 120,
      averageSalary: 437,
      unemploymentRate: 7.8
    },
    Brazil: {
      minimumWage: 242,
      averageSalary: 867,
      unemploymentRate: 8.0
    },
    Russia: {
      minimumWage: 187,
      averageSalary: 960,
      unemploymentRate: 3.9
    },
    "South Korea": {
      minimumWage: 1530,
      averageSalary: 3200,
      unemploymentRate: 2.8
    }
  };

  // Eğer ülke verisi yoksa makul rastgele değerler üret
  return economicData[countryName] || {
    minimumWage: Math.floor(Math.random() * 1000) + 200, // 200-1200 USD arası
    averageSalary: Math.floor(Math.random() * 2000) + 800, // 800-2800 USD arası
    unemploymentRate: +(Math.random() * 8 + 2).toFixed(1) // %2-10 arası
  };
};

// Exchange API için yapılandırma
const getExchangeApiKey = (): string => {
  const key = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_EXCHANGE_API_KEY : undefined;
  if (!key) {
    console.warn('Exchange API anahtarı bulunamadı. Döviz çevirici özelliği çalışmayabilir.');
    return '';
  }
  return key;
};

const EXCHANGE_API_KEY = getExchangeApiKey();
const EXCHANGE_API_BASE = 'https://v6.exchangerate-api.com/v6';

export const getExchangeRate = async (baseCurrency: string, targetCurrency: string) => {
  try {
    if (!EXCHANGE_API_KEY) {
      return 1; // API anahtarı yoksa 1:1 oranı döndür
    }
    const response = await fetch(
      `${EXCHANGE_API_BASE}/${EXCHANGE_API_KEY}/pair/${baseCurrency}/${targetCurrency}`
    );
    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }
    const data = await response.json();
    return data.conversion_rate;
  } catch (error) {
    console.error('Döviz kuru alınamadı:', error);
    return 1; // Hata durumunda 1:1 oranı döndür
  }
};

export const getSupportedCurrencies = async () => {
  try {
    if (!EXCHANGE_API_KEY) {
      return [['USD', 'US Dollar'], ['EUR', 'Euro'], ['GBP', 'British Pound']]; // Varsayılan para birimleri
    }
    const response = await fetch(
      `${EXCHANGE_API_BASE}/${EXCHANGE_API_KEY}/codes`
    );
    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }
    const data = await response.json();
    return data.supported_codes;
  } catch (error) {
    console.error('Para birimleri alınamadı:', error);
    // Hata durumunda temel para birimlerini döndür
    return [
      ['USD', 'US Dollar'],
      ['EUR', 'Euro'],
      ['GBP', 'British Pound'],
      ['JPY', 'Japanese Yen'],
      ['TRY', 'Turkish Lira']
    ];
  }
};

export const api = {
  getAllCountries: async (): Promise<Country[]> => {
    // Önce localStorage'dan kontrol et
    const { cache, timestamp } = loadFromLocalStorage();
    const now = Date.now();
    
    if (cache && timestamp && (now - timestamp < CACHE_DURATION)) {
      return cache;
    }

    try {
      const response = await fetch(`${BASE_URL}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const mappedData = data.map((country: any) => {
        const currencyKey = Object.keys(country.currencies || {})[0] || "";
        const currencyData = country.currencies?.[currencyKey] || {};
        
        return {
          id: country.cca3,
          name: country.name.common,
          flag: country.flags.png,
          capital: country.capital?.[0] || "",
          population: country.population,
          continent: mapRegionToContinent(country.region, country.subregion || ""),
          area: country.area || 0,
          currencies: Object.keys(country.currencies || {}),
          timezones: country.timezones || [],
          annualTourists: getTouristData(country.name.common),
          currency: {
            code: currencyKey,
            name: currencyData.name || "",
            symbol: currencyData.symbol || "",
          },
          languages: Object.values(country.languages || {}),
          coordinates: {
            latitude: country.latlng?.[0] || 0,
            longitude: country.latlng?.[1] || 0,
          },
          economicIndicators: getEconomicData(country.name.common)
        };
      });

      // LocalStorage'a kaydet
      saveToLocalStorage(mappedData, now);
      
      return mappedData;
    } catch (error) {
      console.error("Error fetching countries:", error);
      // Hata durumunda localStorage'daki son veriyi döndür
      return cache || [];
    }
  },
};