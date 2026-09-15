import { apiClient, USE_MOCK_DATA } from "./client";
import { AnnualDataPoint, ExtremeEventRecord } from "@/types/climate";
import { mockClimateAnalytics, mockExtremeEvents } from "@/lib/mock/climate";

export interface ClimateDataResponse {
  analytics: AnnualDataPoint[];
  extremeEvents: ExtremeEventRecord[];
}

export const climateApi = {
  getHistoricalData: async (years = 20): Promise<ClimateDataResponse> => {
    if (USE_MOCK_DATA) {
      return Promise.resolve({
        analytics: mockClimateAnalytics,
        extremeEvents: mockExtremeEvents,
      });
    }

    const response = await apiClient.get<ClimateDataResponse>(`/climate/historical`, {
      params: { years },
    });
    return response.data;
  },
};
