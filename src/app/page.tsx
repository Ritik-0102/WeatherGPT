import { mockCurrentWeather, mockHourlyForecast, mockAdvisory } from "@/lib/mock/weather";
import { WeatherHero } from "@/components/weather/WeatherHero";
import { WeatherMetrics } from "@/components/weather/WeatherMetrics";
import { HourlyForecastHorizontal } from "@/components/weather/HourlyForecastHorizontal";
import { WeatherAdvisory } from "@/components/weather/WeatherAdvisory";
import { QuickQuestions } from "@/components/chat/QuickQuestions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <WeatherHero data={mockCurrentWeather} />

      {/* Weather Advisory Card */}
      <WeatherAdvisory advisory={mockAdvisory} />

      {/* Quick AI Questions */}
      <QuickQuestions />

      {/* Secondary Weather Metrics */}
      <div>
        <h2 className="text-lg font-semibold mb-3 tracking-tight">Current Conditions</h2>
        <WeatherMetrics data={mockCurrentWeather} />
      </div>

      {/* Hourly Forecast */}
      <div>
        <h2 className="text-lg font-semibold mb-3 tracking-tight">Hourly Forecast</h2>
        <HourlyForecastHorizontal data={mockHourlyForecast} />
      </div>
    </div>
  );
}
