import { DailyDataPoint } from "@/types/forecast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Droplets, Wind } from "lucide-react";

interface DailyForecastListProps {
  data: DailyDataPoint[];
}

const getConditionIcon = (iconName: string) => {
  switch (iconName) {
    case "sun":
      return <Sun className="h-6 w-6 text-amber-500" />;
    case "cloud-sun":
      return <CloudSun className="h-6 w-6 text-amber-400" />;
    case "cloud":
      return <Cloud className="h-6 w-6 text-slate-400" />;
    case "cloud-rain":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "cloud-lightning":
      return <CloudLightning className="h-6 w-6 text-purple-500" />;
    default:
      return <Sun className="h-6 w-6 text-amber-500" />;
  }
};

export function DailyForecastList({ data }: DailyForecastListProps) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item, idx) => (
        <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Day & Date & Icon */}
            <div className="flex items-center gap-4 min-w-[180px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
                {getConditionIcon(item.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{item.day}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{item.condition}</p>
              </div>
            </div>

            {/* Weather summary note */}
            <p className="text-xs text-muted-foreground flex-1 hidden md:block">
              {item.summary}
            </p>

            {/* Secondary Metrics */}
            <div className="flex items-center gap-4 text-xs font-medium">
              {item.rainProb > 20 && (
                <Badge variant="secondary" className="text-blue-500 bg-blue-50 dark:bg-blue-950/40 gap-1">
                  <Droplets className="h-3 w-3" />
                  {item.rainProb}% ({item.rainMm}mm)
                </Badge>
              )}

              <div className="flex items-center gap-1 text-muted-foreground">
                <Wind className="h-3.5 w-3.5" />
                <span>{item.maxWind} km/h</span>
              </div>

              {/* Temperature Bar / High Low */}
              <div className="flex items-center gap-2 min-w-[100px] justify-end">
                <span className="font-bold text-sm text-foreground">{item.highTemp}°</span>
                <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-400 to-amber-500" />
                <span className="text-xs text-muted-foreground">{item.lowTemp}°</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
