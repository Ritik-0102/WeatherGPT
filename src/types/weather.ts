export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  pressure: number;
  icon: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitationProb: number;
}

export interface WeatherAdvisory {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  reason: string;
  recommendation: string;
}
