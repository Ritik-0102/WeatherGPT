import { HourlyForecastItem, WeatherAdvisory } from "./weather";

export type ResponseType = "text" | "weather" | "forecast" | "alert" | "advisory" | "comparison" | "climate";

export interface WeatherCardData {
  location: string;
  temperature: number;
  condition: string;
  rainProbability: number;
  expectedRainfall: string;
  humidity: number;
  windSpeed: number;
}

export interface ComparisonData {
  city1: { name: string; temp: number; condition: string; humidity: number };
  city2: { name: string; temp: number; condition: string; humidity: number };
}

export interface RichContent {
  type: ResponseType;
  weatherData?: WeatherCardData;
  forecastData?: HourlyForecastItem[];
  advisoryData?: WeatherAdvisory;
  comparisonData?: ComparisonData;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  richContent?: RichContent;
  feedback?: "up" | "down";
}

export type VoiceState = "IDLE" | "LISTENING" | "PROCESSING" | "SPEAKING" | "ERROR";
