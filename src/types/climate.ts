export interface AnnualDataPoint {
  year: number;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  totalRainfallMm: number;
  heatwaveDays: number;
}

export interface ExtremeEventRecord {
  year: number;
  title: string;
  category: "Rainfall" | "Temperature" | "Cyclone" | "Drought";
  description: string;
  metric: string;
}
