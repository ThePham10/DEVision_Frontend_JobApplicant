// API layer for fetching countries with dial codes
import { countriesApi } from "@/utils/httpHelper";

export type Country = {
    value: string;      // Country code (e.g., "VN")
    label: string;      // Country name (e.g., "Vietnam")
    dialCode: string;   // Dial code (e.g., "+84")
};

type RawCountryData = {
    name: { common: string };
    cca2: string;
    idd?: {
        root?: string;
        suffixes?: string[];
    };
};

// Store countries in memory for dial code lookup
let countriesCache: Country[] = [];

export async function fetchCountries(): Promise<Country[]> {
    // Using httpHelper's countriesApi for centralized API management
    const response = await countriesApi.get<RawCountryData[]>("/all?fields=name,cca2,idd");
    
    const countries = response.data
        .map((country) => {
            // Build dial code from idd.root + first suffix
            let dialCode = "";
            if (country.idd?.root) {
                dialCode = country.idd.root;
                if (country.idd.suffixes && country.idd.suffixes.length > 0) {
                    // Use the first suffix (most countries have only one)
                    dialCode += country.idd.suffixes[0];
                }
            }
            
            return {
                value: country.cca2,
                label: country.name.common,
                dialCode: dialCode,
            };
        })
        .sort((a, b) => a.label.localeCompare(b.label));
    
    // Cache countries for dial code lookup
    countriesCache = countries;
    
    return countries;
}

// Get dial code for a country code (uses cached data)
export function getDialCodeFromCache(countryCode: string): string {
    const country = countriesCache.find(
        c => c.value.toUpperCase() === countryCode.toUpperCase()
    );
    return country?.dialCode || "";
}

// Get country name for a country code (uses cached data)
export function getCountryNameFromCache(countryCode: string): string {
    const country = countriesCache.find(
        c => c.value.toUpperCase() === countryCode.toUpperCase()
    );
    return country?.label || countryCode; // Return code if not found
}

// Get all cached countries
export function getCachedCountries(): Country[] {
    return countriesCache;
}

