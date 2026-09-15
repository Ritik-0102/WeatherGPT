export interface HourlyDataPoint {
  time: string;
  temp: number;
  feelsLike: number;
  pop: number; // probability of precipitation %
  rainMm: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export interface DailyDataPoint {
  day: string;
  date: string;
  condition: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
  rainProb: number;
  rainMm: number;
  maxWind: number;
  humidity: number;
  uvIndex: number;
  summary: string;
}
