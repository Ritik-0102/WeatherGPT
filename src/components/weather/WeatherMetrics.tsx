import { CurrentWeather } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Wind, Eye, Sun, Gauge } from "lucide-react";

interface WeatherMetricsProps {
  data: CurrentWeather;
}

export function WeatherMetrics({ data }: WeatherMetricsProps) {
  const metrics = [
    {
      label: "Humidity",
      value: `${data.humidity}%`,
      icon: Droplets,
    },
    {
      label: "Wind",
      value: `${data.windSpeed} km/h`,
      icon: Wind,
    },
    {
      label: "Visibility",
      value: `${data.visibility} km`,
      icon: Eye,
    },
    {
      label: "UV Index",
      value: data.uvIndex,
      icon: Sun,
    },
    {
      label: "Pressure",
      value: `${data.pressure} hPa`,
      icon: Gauge,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-card shadow-sm">
          <CardContent className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <metric.icon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">{metric.label}</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">{metric.value}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
