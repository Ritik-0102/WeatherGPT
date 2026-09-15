import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ChartSkeleton() {
  return (
    <Card className="p-4">
      <CardContent className="p-0 space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-[240px] w-full rounded-xl" />
      </CardContent>
    </Card>
  );
}
