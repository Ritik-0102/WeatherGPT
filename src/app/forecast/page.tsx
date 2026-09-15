import { mockDetailedHourly, mockDailyForecast } from "@/lib/mock/forecast";
import { HourlyForecastChart } from "@/components/weather/HourlyForecastChart";
import { DailyForecastList } from "@/components/weather/DailyForecastList";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function ForecastPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>New Delhi, India</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Detailed Forecast</h1>
        </div>
      </div>

      {/* Hourly Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Hourly Trends (Next 24 Hours)</h2>
        </div>
        <HourlyForecastChart data={mockDetailedHourly} />
      </section>

      {/* Daily Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">7-Day Extended Forecast</h2>
        </div>
        <DailyForecastList data={mockDailyForecast} />
      </section>
    </div>
  );
}
