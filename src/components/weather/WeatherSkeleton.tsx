import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function WeatherSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 p-0">
          <div className="space-y-3 w-full">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-28 w-28 rounded-full shrink-0" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <CardContent className="p-0 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
