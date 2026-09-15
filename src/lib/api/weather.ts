import { apiClient, USE_MOCK_DATA } from "./client";
import { CurrentWeather, HourlyForecastItem } from "@/types/weather";
import { DailyDataPoint } from "@/types/forecast";
import { mockCurrentWeather, mockHourlyForecast } from "@/lib/mock/weather";
import { mockDailyForecast } from "@/lib/mock/forecast";

export const weatherApi = {
  testConnection: async (): Promise<{ status: string }> => {
    if (USE_MOCK_DATA) {
      return { status: "Mock API connection operational" };
    }
    const response = await apiClient.get<{ status: string }>("/weather/test");
    return response.data;
  },

  getCurrentWeatherByCity: async (city = "New Delhi"): Promise<CurrentWeather> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve({ ...mockCurrentWeather, location: city });
    }
    try {
      const response = await apiClient.get<CurrentWeather>("/weather/current/city", {
        params: { city },
      });
      return response.data;
    } catch {
      return { ...mockCurrentWeather, location: city };
    }
  },

  getCurrentWeatherByCoordinates: async (latitude: number, longitude: number): Promise<CurrentWeather> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockCurrentWeather);
    }
    try {
      const response = await apiClient.get<CurrentWeather>("/weather/current/coor", {
        params: { latitude, longitude },
      });
      return response.data;
    } catch {
      return mockCurrentWeather;
    }
  },

  getDailyForecastByCity: async (city = "New Delhi"): Promise<HourlyForecastItem[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockHourlyForecast);
    }
    try {
      const response = await apiClient.get<HourlyForecastItem[]>("/weather/day/city", {
        params: { city },
      });
      return response.data;
    } catch {
      return mockHourlyForecast;
    }
  },

  getDailyForecastByCoordinates: async (latitude: number, longitude: number): Promise<HourlyForecastItem[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockHourlyForecast);
    }
    try {
      const response = await apiClient.get<HourlyForecastItem[]>("/weather/day/coor", {
        params: { latitude, longitude },
      });
      return response.data;
    } catch {
      return mockHourlyForecast;
    }
  },

  getWeeklyForecastByCity: async (city = "New Delhi"): Promise<DailyDataPoint[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockDailyForecast);
    }
    try {
      const response = await apiClient.get<DailyDataPoint[]>("/weather/week/city", {
        params: { city },
      });
      return response.data;
    } catch {
      return mockDailyForecast;
    }
  },

  getWeeklyForecastByCoordinates: async (latitude: number, longitude: number): Promise<DailyDataPoint[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockDailyForecast);
    }
    try {
      const response = await apiClient.get<DailyDataPoint[]>("/weather/week/coor", {
        params: { latitude, longitude },
      });
      return response.data;
    } catch {
      return mockDailyForecast;
    }
  },
};
