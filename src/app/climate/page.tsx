"use client";

import { useState } from "react";
import { mockClimateAnalytics, mockExtremeEvents } from "@/lib/mock/climate";
import { TemperatureTrendChart } from "@/components/climate/TemperatureTrendChart";
import { RainfallTrendChart } from "@/components/climate/RainfallTrendChart";
import { AIClimateInsights } from "@/components/climate/AIClimateInsights";
import { ExtremeEventsList } from "@/components/climate/ExtremeEventsList";
import { Button } from "@/components/ui/button";
import { BarChart3, History } from "lucide-react";

type Timescale = "1 Year" | "5 Years" | "10 Years" | "20 Years";

export default function ClimatePage() {
  const [timescale, setTimescale] = useState<Timescale>("20 Years");

  const getFilteredData = () => {
    switch (timescale) {
      case "1 Year": return mockClimateAnalytics.slice(-2);
      case "5 Years": return mockClimateAnalytics.slice(-5);
      case "10 Years": return mockClimateAnalytics.slice(-8);
      default: return mockClimateAnalytics;
    }
  };

  const data = getFilteredData();

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <BarChart3 className="h-5 w-5" />
            <h1>Climate & Historical Analytics</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Multi-decadal temperature trends, precipitation variability, and extreme climate records.
          </p>
        </div>

        {/* Timescale Selector */}
        <div className="flex items-center gap-1 bg-card p-1 rounded-xl border shadow-sm">
          {(["1 Year", "5 Years", "10 Years", "20 Years"] as const).map((ts) => (
            <Button
              key={ts}
              variant={timescale === ts ? "default" : "ghost"}
              size="xs"
              onClick={() => setTimescale(ts)}
              className="text-xs rounded-lg"
            >
              {ts}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Synthesis Banner */}
      <AIClimateInsights timescale={timescale} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperatureTrendChart data={data} />
        <RainfallTrendChart data={data} />
      </div>

      {/* Extreme Historical Records */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h2 className="text-base font-bold tracking-tight">Notable Historical Weather Events</h2>
        </div>
        <ExtremeEventsList events={mockExtremeEvents} />
      </section>
    </div>
  );
}
