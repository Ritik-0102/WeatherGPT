import { ChatMessage, RichContent } from "@/types/chat";

export const getMockResponse = (query: string): { text: string; richContent?: RichContent } => {
  const lower = query.toLowerCase();

  if (lower.includes("rain") || lower.includes("umbrella")) {
    return {
      text: "There is a high chance of rain in New Delhi later today. Precipitation probability peaks around 5 PM at 80%. Carrying an umbrella is strongly recommended if you are stepping out.",
      richContent: {
        type: "weather",
        weatherData: {
          location: "New Delhi",
          temperature: 29,
          condition: "Rain Expected",
          rainProbability: 80,
          expectedRainfall: "18mm",
          humidity: 82,
          windSpeed: 16,
        },
      },
    };
  }

  if (lower.includes("compare") || (lower.includes("delhi") && lower.includes("mumbai"))) {
    return {
      text: "Here is a quick weather comparison between Delhi and Mumbai. Delhi is currently warmer with moderate humidity, while Mumbai experiences typical coastal humidity and slightly lower temperatures.",
      richContent: {
        type: "comparison",
        comparisonData: {
          city1: { name: "Delhi", temp: 31, condition: "Partly Cloudy", humidity: 65 },
          city2: { name: "Mumbai", temp: 28, condition: "Humid & Overcast", humidity: 88 },
        },
      },
    };
  }

  if (lower.includes("weekend") || lower.includes("forecast") || lower.includes("tomorrow")) {
    return {
      text: "Here is the upcoming forecast. Temperatures will remain between 26°C and 32°C with light scattered rainfall expected toward the evening.",
      richContent: {
        type: "forecast",
        forecastData: [
          { time: "Sat AM", temperature: 26, condition: "Clear", icon: "sun", precipitationProb: 10 },
          { time: "Sat PM", temperature: 31, condition: "Partly Cloudy", icon: "cloud-sun", precipitationProb: 20 },
          { time: "Sun AM", temperature: 27, condition: "Overcast", icon: "cloud", precipitationProb: 40 },
          { time: "Sun PM", temperature: 29, condition: "Light Rain", icon: "cloud-rain", precipitationProb: 65 },
        ],
      },
    };
  }

  if (lower.includes("advisory") || lower.includes("warning") || lower.includes("travel")) {
    return {
      text: "WeatherGPT AI Alert System: Local advisory issued for New Delhi due to localized waterlogging risks in low-lying areas during peak evening commute hours.",
      richContent: {
        type: "advisory",
        advisoryData: {
          id: "adv-102",
          severity: "warning",
          title: "Localized Waterlogging Advisory",
          reason: "Heavy rainfall expected between 4 PM and 7 PM.",
          recommendation: "Avoid low-lying underpasses and allow extra time for evening commutes.",
        },
      },
    };
  }

  return {
    text: `Based on meteorological data, current conditions in New Delhi show a temperature of 31°C with partly cloudy skies. Winds are coming from the NW at 12 km/h. Feel free to ask about specific hourly forecasts, climate trends, or weather advisories!`,
  };
};

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Namaste! I am WeatherGPT, your AI-powered meteorological assistant. Ask me anything about current weather, forecasts, extreme weather alerts, or climate analytics.",
    timestamp: "10:00 AM",
  },
];
