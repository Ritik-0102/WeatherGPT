"use client";

import { AnnualDataPoint } from "@/types/climate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TemperatureTrendChartProps {
  data: AnnualDataPoint[];
}

export function TemperatureTrendChart({ data }: TemperatureTrendChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Mean & Maximum Temperature Trend (°C)</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} domain={[20, 50]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item: AnnualDataPoint = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-bold">Year {item.year}</p>
                        <p className="text-amber-500 font-medium">Avg Temp: {item.avgTemp}°C</p>
                        <p className="text-red-500 font-medium">Peak Max: {item.maxTemp}°C</p>
                        <p className="text-orange-500 font-medium">Heatwave Days: {item.heatwaveDays} days</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Avg Temp (°C)"
              />
              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Max Temp (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
