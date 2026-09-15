import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ForecastSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardContent className="p-0 space-y-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </CardContent>
      </Card>

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <CardContent className="p-0 flex items-center justify-between gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-36 flex-1 hidden sm:block" />
              <Skeleton className="h-6 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
