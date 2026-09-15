import { WeatherAlert } from "@/types/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Clock, ShieldAlert, AlertTriangle, Info, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AlertDetailsModalProps {
  alert: WeatherAlert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertDetailsModal({ alert, open, onOpenChange }: AlertDetailsModalProps) {
  if (!alert) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-6">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            {getSeverityBadge(alert.severity)}
            <span className="text-xs text-muted-foreground">{alert.issuedAt}</span>
          </div>
          <DialogTitle className="text-xl font-bold leading-tight">{alert.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {alert.location}, {alert.state}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 text-xs">
          <div className="grid grid-cols-2 gap-2 bg-muted/40 p-3 rounded-xl">
            <div>
              <p className="text-muted-foreground font-medium">Expected Duration</p>
              <p className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {alert.expectedDuration}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Impact / Volume</p>
              <p className="font-semibold text-foreground mt-0.5">{alert.expectedRainfallOrImpact}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Affected Zone</h4>
            <p className="text-foreground bg-card border p-2.5 rounded-lg">{alert.affectedArea}</p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Meteorological Overview</h4>
            <p className="text-muted-foreground leading-relaxed">{alert.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-2">Safety Instructions</h4>
            <div className="space-y-1.5">
              {alert.safetyInstructions.map((instruction, idx) => (
                <div key={idx} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t flex items-center justify-between gap-2">
          <p className="text-[10px] text-muted-foreground">Source: WeatherGPT Official IMD Feed</p>
          <Link
            href={`/chat?q=Give%20me%20safety%20tips%20for%20${encodeURIComponent(alert.title)}`}
            className={cn(buttonVariants({ size: "sm" }), "gap-1 text-xs")}
          >
            Ask WeatherGPT AI <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
