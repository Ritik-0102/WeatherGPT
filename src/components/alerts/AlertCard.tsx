import { WeatherAlert } from "@/types/alert";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ShieldAlert, AlertTriangle, Info, ArrowUpRight } from "lucide-react";

interface AlertCardProps {
  alert: WeatherAlert;
  onSelect: (alert: WeatherAlert) => void;
}

export function AlertCard({ alert, onSelect }: AlertCardProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return <Badge variant="destructive" className="flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5" /> CRITICAL</Badge>;
      case "WARNING":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> WARNING</Badge>;
      case "WATCH":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 flex items-center gap-1"><Info className="h-3.5 w-3.5" /> WATCH</Badge>;
      case "ADVISORY":
        return <Badge variant="outline" className="flex items-center gap-1"><Info className="h-3.5 w-3.5" /> ADVISORY</Badge>;
      default:
        return <Badge variant="outline">INFO</Badge>;
    }
  };

  const getBorderClass = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "border-l-4 border-l-red-500 bg-red-500/5";
      case "WARNING": return "border-l-4 border-l-amber-500 bg-amber-500/5";
      case "WATCH": return "border-l-4 border-l-blue-500 bg-blue-500/5";
      default: return "border-l-4 border-l-slate-400 bg-card";
    }
  };

  return (
    <Card className={`shadow-sm transition-all hover:shadow-md ${getBorderClass(alert.severity)}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        {getSeverityBadge(alert.severity)}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{alert.issuedAt}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h3 className="font-bold text-base leading-tight text-foreground">{alert.title}</h3>

        <div className="flex items-center gap-1 text-xs font-semibold text-primary">
          <MapPin className="h-3.5 w-3.5" />
          <span>{alert.location}, {alert.state}</span>
        </div>

        <div className="text-xs text-muted-foreground bg-background/80 p-2.5 rounded-lg border space-y-1">
          <p><span className="font-semibold text-foreground">Expected Impact:</span> {alert.expectedRainfallOrImpact}</p>
          <p><span className="font-semibold text-foreground">Recommendation:</span> {alert.recommendation}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0 justify-end">
        <Button size="sm" variant="ghost" onClick={() => onSelect(alert)} className="text-xs gap-1 text-primary">
          View Full Advisory <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
