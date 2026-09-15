import { ExtremeEventRecord } from "@/types/climate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, CloudRain, Wind, SunDim } from "lucide-react";

interface ExtremeEventsListProps {
  events: ExtremeEventRecord[];
}

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "Temperature":
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1"><Flame className="h-3 w-3" /> Heatwave</Badge>;
    case "Rainfall":
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"><CloudRain className="h-3 w-3" /> Rainfall</Badge>;
    case "Cyclone":
      return <Badge className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-1"><Wind className="h-3 w-3" /> Cyclone</Badge>;
    default:
      return <Badge variant="secondary" className="flex items-center gap-1"><SunDim className="h-3 w-3" /> Drought</Badge>;
  }
};

export function ExtremeEventsList({ events }: ExtremeEventsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {events.map((record, idx) => (
        <Card key={idx} className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-primary">Year {record.year}</span>
              {getCategoryBadge(record.category)}
            </div>

            <h4 className="font-bold text-sm text-foreground">{record.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{record.description}</p>

            <div className="pt-2 border-t flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Record Peak:</span>
              <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded">{record.metric}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
