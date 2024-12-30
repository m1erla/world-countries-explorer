import type { Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

const mapRegionToContinent = (region: string, subregion: string): string => {
  switch (region) {
    case "Americas":
      return subregion.includes("South") ? "South America" : "North America";
    case "Antarctic":
      return "Antarctica";
    case "Asia":
      return region;
    case "Europe":
      return region;
    case "Africa":
      return region;
    case "Oceania":
      return region;
    default:
      return region;
  }
};

export const api = {
  getAllCountries: async (): Promise<Country[]> => {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      
      return data.map((country: any) => {
        const currencyKey = Object.keys(country.currencies || {})[0] || "";
        const currencyData = country.currencies?.[currencyKey] || {};
        
        return {
          id: country.cca3,
          name: country.name.common,
          flag: country.flags.png,
          capital: country.capital?.[0] || "",
          population: country.population,
          continent: mapRegionToContinent(country.region, country.subregion || ""),
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
        };
      });
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  },
};