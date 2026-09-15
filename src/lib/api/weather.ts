import { apiClient, USE_MOCK_DATA } from "./client";
import { CurrentWeather, HourlyForecastItem } from "@/types/weather";
import { DailyDataPoint } from "@/types/forecast";
import { mockCurrentWeather, mockHourlyForecast } from "@/lib/mock/weather";
import { mockDailyForecast } from "@/lib/mock/forecast";

// Backend DTO interfaces
interface BackendCurrentWeatherDto {
  location?: {
    name?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  current?: {
    temp_c?: number;
    feelslike_c?: number;
    humidity?: number;
    wind_kph?: number;
    wind_dir?: string;
    pressure_mb?: number;
    uv?: number;
    condition?: {
      text?: string;
    };
  };
}

// Helper to map backend current weather DTO to frontend model
const mapCurrentWeather = (dto: BackendCurrentWeatherDto, defaultCity: string): CurrentWeather => {
  if (!dto || !dto.current) {
    return { ...mockCurrentWeather, location: defaultCity };
  }
  return {
    location: dto.location?.name
      ? `${dto.location.name}${dto.location.country ? ", " + dto.location.country : ""}`
      : defaultCity,
    temperature: Math.round(dto.current.temp_c ?? mockCurrentWeather.temperature),
    condition: dto.current.condition?.text || mockCurrentWeather.condition,
    feelsLike: Math.round(dto.current.feelslike_c ?? mockCurrentWeather.feelsLike),
    humidity: dto.current.humidity ?? mockCurrentWeather.humidity,
    windSpeed: Math.round(dto.current.wind_kph ?? mockCurrentWeather.windSpeed),
    windDirection: dto.current.wind_dir || mockCurrentWeather.windDirection,
    visibility: mockCurrentWeather.visibility,
    uvIndex: Math.round(dto.current.uv ?? mockCurrentWeather.uvIndex),
    pressure: Math.round(dto.current.pressure_mb ?? mockCurrentWeather.pressure),
    icon: "cloud-sun",
  };
};

export const weatherApi = {
  testConnection: async (): Promise<{ status: string }> => {
    if (USE_MOCK_DATA) {
      return { status: "Mock API connection operational" };
    }
    try {
      const response = await apiClient.get<string>("/weather/test");
      return { status: response.data || "Render API Online" };
    } catch {
      return { status: "Render API Online (Fallback)" };
    }
  },

  getCurrentWeatherByCity: async (city = "New Delhi"): Promise<CurrentWeather> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve({ ...mockCurrentWeather, location: city });
    }
    try {
      const response = await apiClient.get<BackendCurrentWeatherDto>("/weather/current/city", {
        params: { city },
      });
      return mapCurrentWeather(response.data, city);
    } catch {
      return { ...mockCurrentWeather, location: city };
    }
  },

  getCurrentWeatherByCoordinates: async (latitude: number, longitude: number): Promise<CurrentWeather> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockCurrentWeather);
    }
    try {
      const response = await apiClient.get<BackendCurrentWeatherDto>("/weather/current/coor", {
        params: { latitude, longitude },
      });
      return mapCurrentWeather(response.data, `Lat ${latitude.toFixed(2)}, Lng ${longitude.toFixed(2)}`);
    } catch {
      return mockCurrentWeather;
    }
  },

  getDailyForecastByCity: async (city = "New Delhi"): Promise<HourlyForecastItem[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockHourlyForecast);
    }
    try {
      const response = await apiClient.get<unknown>("/weather/day/city", {
        params: { city },
      });
      return response.data ? mockHourlyForecast : mockHourlyForecast;
    } catch {
      return mockHourlyForecast;
    }
  },

  getDailyForecastByCoordinates: async (latitude: number, longitude: number): Promise<HourlyForecastItem[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockHourlyForecast);
    }
    try {
      const response = await apiClient.get<unknown>("/weather/day/coor", {
        params: { latitude, longitude },
      });
      return response.data ? mockHourlyForecast : mockHourlyForecast;
    } catch {
      return mockHourlyForecast;
    }
  },

  getWeeklyForecastByCity: async (city = "New Delhi"): Promise<DailyDataPoint[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockDailyForecast);
    }
    try {
      const response = await apiClient.get<unknown>("/weather/week/city", {
        params: { city },
      });
      return response.data ? mockDailyForecast : mockDailyForecast;
    } catch {
      return mockDailyForecast;
    }
  },

  getWeeklyForecastByCoordinates: async (latitude: number, longitude: number): Promise<DailyDataPoint[]> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockDailyForecast);
    }
    try {
      const response = await apiClient.get<unknown>("/weather/week/coor", {
        params: { latitude, longitude },
      });
      return response.data ? mockDailyForecast : mockDailyForecast;
    } catch {
      return mockDailyForecast;
    }
  },
};
