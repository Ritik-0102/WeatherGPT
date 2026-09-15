import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Weather data temporarily unavailable",
  description = "Could not establish a connection with the meteorological data servers. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-2xl bg-card shadow-sm my-6 space-y-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-base text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground max-w-sm">{description}</p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} size="sm" variant="outline" className="gap-2 text-xs mt-2">
          <RefreshCw className="h-3.5 w-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
