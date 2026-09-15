import { HourlyForecastItem } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, CloudSun, Cloud, CloudRain, Droplets } from "lucide-react";

interface ForecastResponseCardProps {
  data: HourlyForecastItem[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "sun": return <Sun className="h-5 w-5 text-amber-500" />;
    case "cloud-sun": return <CloudSun className="h-5 w-5 text-amber-400" />;
    case "cloud": return <Cloud className="h-5 w-5 text-slate-400" />;
    case "cloud-rain": return <CloudRain className="h-5 w-5 text-blue-500" />;
    default: return <Sun className="h-5 w-5 text-amber-500" />;
  }
};

export function ForecastResponseCard({ data }: ForecastResponseCardProps) {
  return (
    <Card className="my-3 bg-card border shadow-sm">
      <CardContent className="p-3 sm:p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Forecast Snapshot</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-between p-2.5 bg-muted/30 rounded-lg text-center gap-1.5">
              <span className="text-xs font-medium">{item.time}</span>
              {getIcon(item.icon)}
              <span className="font-bold text-sm">{item.temperature}°C</span>
              {item.precipitationProb > 0 && (
                <span className="text-[10px] text-blue-500 flex items-center gap-0.5">
                  <Droplets className="h-2.5 w-2.5" />
                  {item.precipitationProb}%
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
