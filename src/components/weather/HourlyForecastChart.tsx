"use client";

import { useState } from "react";
import { HourlyDataPoint } from "@/types/forecast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HourlyForecastChartProps {
  data: HourlyDataPoint[];
}

export function HourlyForecastChart({ data }: HourlyForecastChartProps) {
  const [metric, setMetric] = useState<"temp" | "pop" | "windSpeed">("temp");

  const getMetricConfig = () => {
    switch (metric) {
      case "temp":
        return {
          title: "Temperature Trend (°C)",
          dataKey: "temp",
          unit: "°C",
          stroke: "#f59e0b",
          fill: "rgba(245, 158, 11, 0.15)",
        };
      case "pop":
        return {
          title: "Precipitation Probability (%)",
          dataKey: "pop",
          unit: "%",
          stroke: "#3b82f6",
          fill: "rgba(59, 130, 246, 0.15)",
        };
      case "windSpeed":
        return {
          title: "Wind Speed (km/h)",
          dataKey: "windSpeed",
          unit: " km/h",
          stroke: "#14b8a6",
          fill: "rgba(20, 184, 166, 0.15)",
        };
    }
  };

  const config = getMetricConfig();

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <CardTitle className="text-base font-semibold">{config.title}</CardTitle>

        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg text-xs">
          <Button
            variant={metric === "temp" ? "default" : "ghost"}
            size="xs"
            onClick={() => setMetric("temp")}
            className="text-xs"
          >
            Temp
          </Button>
          <Button
            variant={metric === "pop" ? "default" : "ghost"}
            size="xs"
            onClick={() => setMetric("pop")}
            className="text-xs"
          >
            Rain %
          </Button>
          <Button
            variant={metric === "windSpeed" ? "default" : "ghost"}
            size="xs"
            onClick={() => setMetric("windSpeed")}
            className="text-xs"
          >
            Wind
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item: HourlyDataPoint = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-bold">{item.time} ({item.condition})</p>
                        <p className="text-amber-500 font-medium">Temp: {item.temp}°C (Feels {item.feelsLike}°C)</p>
                        <p className="text-blue-500 font-medium">Precipitation: {item.pop}% ({item.rainMm} mm)</p>
                        <p className="text-teal-500 font-medium">Wind: {item.windSpeed} km/h</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.stroke}
                strokeWidth={2}
                fill={config.fill}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
