import { HourlyForecastItem } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CloudSun, Cloud, CloudRain, Moon, Sun, Droplets } from "lucide-react";

interface HourlyForecastHorizontalProps {
  data: HourlyForecastItem[];
}

const getIcon = (iconName: string, className?: string) => {
  const props = { className: className || "h-6 w-6" };
  switch (iconName) {
    case "cloud-sun": return <CloudSun {...props} />;
    case "cloud": return <Cloud {...props} />;
    case "cloud-rain": return <CloudRain {...props} />;
    case "moon": return <Moon {...props} />;
    case "sun": return <Sun {...props} />;
    default: return <Sun {...props} />;
  }
};

export function HourlyForecastHorizontal({ data }: HourlyForecastHorizontalProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex w-max space-x-2 p-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex w-[80px] flex-col items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <span className="text-sm font-medium text-muted-foreground">{item.time}</span>
                <div className="text-primary">{getIcon(item.icon)}</div>
                <span className="text-lg font-semibold">{item.temperature}°</span>

                {item.precipitationProb > 0 ? (
                  <div className="flex items-center text-xs font-medium text-blue-500">
                    <Droplets className="mr-0.5 h-3 w-3" />
                    {item.precipitationProb}%
                  </div>
                ) : (
                  <div className="h-4" /> // Placeholder for alignment
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
