import { apiClient, USE_MOCK_DATA } from "./client";
import { WeatherAlert, AlertSeverity } from "@/types/alert";
import { mockWeatherAlerts } from "@/lib/mock/alerts";

export const alertsApi = {
  getAlerts: async (severity?: AlertSeverity | "ALL"): Promise<WeatherAlert[]> => {
    if (USE_MOCK_DATA) {
      if (severity && severity !== "ALL") {
        return Promise.resolve(mockWeatherAlerts.filter((a) => a.severity === severity));
      }
      return Promise.resolve(mockWeatherAlerts);
    }

    const response = await apiClient.get<WeatherAlert[]>(`/alerts`, {
      params: { severity },
    });
    return response.data;
  },
};
