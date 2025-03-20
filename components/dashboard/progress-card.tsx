import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProgressCardProps {
  title: string;
  value: number;
  max: number;
  unit?: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  showValue?: boolean;
}

export function ProgressCard({
  title,
  value,
  max,
  unit = "%",
  icon: Icon,
  description,
  className,
  showValue = true,
}: ProgressCardProps) {
  const percentage = (value / max) * 100;
  const getColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {showValue && (
                <p className="text-2xl font-bold">
                  {value}
                  {unit}
                </p>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            {Icon && (
              <div className="rounded-full bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={cn("h-2 rounded-full", getColor(percentage))}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 