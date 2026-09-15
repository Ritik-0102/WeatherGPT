export type AlertSeverity = "INFO" | "ADVISORY" | "WATCH" | "WARNING" | "CRITICAL";

export interface WeatherAlert {
  id: string;
  type: string;
  title: string;
  location: string;
  state: string;
  severity: AlertSeverity;
  issuedAt: string;
  expectedDuration: string;
  affectedArea: string;
  expectedRainfallOrImpact: string;
  recommendation: string;
  description: string;
  safetyInstructions: string[];
}
