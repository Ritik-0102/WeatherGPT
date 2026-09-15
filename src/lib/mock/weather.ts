import { CurrentWeather, HourlyForecastItem, WeatherAdvisory } from "@/types/weather";

export const mockCurrentWeather: CurrentWeather = {
  location: "New Delhi, India",
  temperature: 31,
  condition: "Partly Cloudy",
  feelsLike: 34,
  humidity: 65,
  windSpeed: 12,
  windDirection: "NW",
  visibility: 8,
  uvIndex: 6,
  pressure: 1012,
  icon: "cloud-sun",
};

export const mockHourlyForecast: HourlyForecastItem[] = [
  { time: "Now", temperature: 31, condition: "Partly Cloudy", icon: "cloud-sun", precipitationProb: 10 },
  { time: "2 PM", temperature: 32, condition: "Partly Cloudy", icon: "cloud-sun", precipitationProb: 10 },
  { time: "3 PM", temperature: 32, condition: "Cloudy", icon: "cloud", precipitationProb: 20 },
  { time: "4 PM", temperature: 31, condition: "Light Rain", icon: "cloud-rain", precipitationProb: 60 },
  { time: "5 PM", temperature: 29, condition: "Rain", icon: "cloud-rain", precipitationProb: 80 },
  { time: "6 PM", temperature: 28, condition: "Rain", icon: "cloud-rain", precipitationProb: 75 },
  { time: "7 PM", temperature: 27, condition: "Cloudy", icon: "cloud", precipitationProb: 40 },
  { time: "8 PM", temperature: 27, condition: "Clear", icon: "moon", precipitationProb: 10 },
  { time: "9 PM", temperature: 26, condition: "Clear", icon: "moon", precipitationProb: 5 },
  { time: "10 PM", temperature: 26, condition: "Clear", icon: "moon", precipitationProb: 5 },
  { time: "11 PM", temperature: 25, condition: "Clear", icon: "moon", precipitationProb: 0 },
  { time: "12 AM", temperature: 24, condition: "Clear", icon: "moon", precipitationProb: 0 },
];

export const mockAdvisory: WeatherAdvisory = {
  id: "adv-001",
  severity: "warning",
  title: "Evening Showers Expected",
  reason: "A localized weather system is approaching your area.",
  recommendation: "Rain is likely between 4 PM and 6 PM. If you're heading outside, carrying an umbrella would be advisable.",
};
