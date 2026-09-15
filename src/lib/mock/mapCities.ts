export interface CityWeatherMarker {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  alert?: {
    severity: "warning" | "critical";
    title: string;
  };
}

export const mockMapCities: CityWeatherMarker[] = [
  {
    id: "delhi",
    name: "New Delhi",
    state: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    temp: 31,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    alert: { severity: "warning", title: "Evening Heavy Rain Warning" },
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    lat: 19.076,
    lng: 72.8777,
    temp: 28,
    condition: "Humid & Overcast",
    humidity: 88,
    windSpeed: 18,
    alert: { severity: "warning", title: "High Tide & Coastal Rain Alert" },
  },
  {
    id: "chandigarh",
    name: "Chandigarh",
    state: "Chandigarh",
    lat: 30.7333,
    lng: 76.7794,
    temp: 30,
    condition: "Partly Cloudy",
    humidity: 62,
    windSpeed: 10,
  },
  {
    id: "phagwara",
    name: "Phagwara",
    state: "Punjab",
    lat: 31.224,
    lng: 75.7708,
    temp: 29,
    condition: "Moderate Rain",
    humidity: 80,
    windSpeed: 14,
    alert: { severity: "critical", title: "Thunderstorm & Rainfall Warning" },
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    lat: 31.634,
    lng: 74.8723,
    temp: 29,
    condition: "Light Rain",
    humidity: 78,
    windSpeed: 11,
  },
  {
    id: "ludhiana",
    name: "Ludhiana",
    state: "Punjab",
    lat: 30.901,
    lng: 75.8573,
    temp: 30,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 12,
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    lat: 22.5726,
    lng: 88.3639,
    temp: 32,
    condition: "Thunderstorms",
    humidity: 84,
    windSpeed: 20,
    alert: { severity: "critical", title: "Cyclone Track Watch" },
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    lat: 13.0827,
    lng: 80.2707,
    temp: 33,
    condition: "Sunny",
    humidity: 72,
    windSpeed: 15,
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    temp: 24,
    condition: "Pleasant & Breezy",
    humidity: 60,
    windSpeed: 16,
  },
];
