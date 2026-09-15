import { apiClient, USE_MOCK_DATA } from "./client";
import { mockMapCities, CityWeatherMarker } from "@/lib/mock/mapCities";

export interface LocationSearchResult {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export const locationApi = {
  searchLocation: async (query: string): Promise<LocationSearchResult[]> => {
    if (USE_MOCK_DATA) {
      const lower = query.toLowerCase();
      return Promise.resolve(
        mockMapCities
          .filter(
            (c) =>
              c.name.toLowerCase().includes(lower) || c.state.toLowerCase().includes(lower)
          )
          .map((c: CityWeatherMarker) => ({
            id: c.id,
            name: c.name,
            state: c.state,
            lat: c.lat,
            lng: c.lng,
          }))
      );
    }

    const response = await apiClient.get<LocationSearchResult[]>(`/location/search`, {
      params: { q: query },
    });
    return response.data;
  },
};
