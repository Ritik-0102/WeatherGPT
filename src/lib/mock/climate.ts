import { AnnualDataPoint, ExtremeEventRecord } from "@/types/climate";

export const mockClimateAnalytics: AnnualDataPoint[] = [
  { year: 2004, avgTemp: 24.8, maxTemp: 41.2, minTemp: 5.2, totalRainfallMm: 680, heatwaveDays: 8 },
  { year: 2006, avgTemp: 25.0, maxTemp: 41.8, minTemp: 5.0, totalRainfallMm: 710, heatwaveDays: 9 },
  { year: 2008, avgTemp: 25.1, maxTemp: 42.0, minTemp: 5.4, totalRainfallMm: 650, heatwaveDays: 10 },
  { year: 2010, avgTemp: 25.4, maxTemp: 43.1, minTemp: 4.8, totalRainfallMm: 820, heatwaveDays: 14 },
  { year: 2012, avgTemp: 25.3, maxTemp: 42.5, minTemp: 5.1, totalRainfallMm: 590, heatwaveDays: 12 },
  { year: 2014, avgTemp: 25.5, maxTemp: 43.0, minTemp: 4.9, totalRainfallMm: 610, heatwaveDays: 13 },
  { year: 2016, avgTemp: 25.8, maxTemp: 44.2, minTemp: 5.3, totalRainfallMm: 790, heatwaveDays: 18 },
  { year: 2018, avgTemp: 25.7, maxTemp: 43.8, minTemp: 4.6, totalRainfallMm: 740, heatwaveDays: 16 },
  { year: 2020, avgTemp: 25.9, maxTemp: 44.5, minTemp: 4.5, totalRainfallMm: 890, heatwaveDays: 19 },
  { year: 2022, avgTemp: 26.2, maxTemp: 45.1, minTemp: 4.2, totalRainfallMm: 920, heatwaveDays: 22 },
  { year: 2024, avgTemp: 26.4, maxTemp: 45.6, minTemp: 4.0, totalRainfallMm: 860, heatwaveDays: 25 },
];

export const mockExtremeEvents: ExtremeEventRecord[] = [
  {
    year: 2024,
    title: "Record North-India Heatwave",
    category: "Temperature",
    description: "Prolonged heatwave spell across Delhi NCR and Punjab with temperatures breaking historical maximums.",
    metric: "45.6°C Peak",
  },
  {
    year: 2023,
    title: "North-West India Flash Deluge",
    category: "Rainfall",
    description: "Interaction of monsoonal winds with Western Disturbances caused intense 24-hour rainfall.",
    metric: "153 mm / 24 hrs",
  },
  {
    year: 2021,
    title: "Cyclone Tauktae Impact",
    category: "Cyclone",
    description: "Extremely severe cyclonic storm bringing gale winds and heavy coastal downpours.",
    metric: "185 km/h Wind",
  },
  {
    year: 2016,
    title: "Severe Summer Drought",
    category: "Drought",
    description: "El Niño influenced monsoon deficit affecting reservoir levels across agricultural belts.",
    metric: "-28% Rain Deficit",
  },
];
