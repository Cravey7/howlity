import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  status: "success" | "warning" | "error" | "info";
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export function StatusCard({
  title,
  status,
  value,
  icon: Icon,
  description,
  className,
}: StatusCardProps) {
  const getStatusColor = (status: StatusCardProps["status"]) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBgColor = (status: StatusCardProps["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/10";
      case "warning":
        return "bg-yellow-500/10";
      case "error":
        return "bg-red-500/10";
      case "info":
        return "bg-blue-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  getStatusBgColor(status),
                  getStatusColor(status)
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {Icon && (
            <div className={cn("rounded-full p-2", getStatusBgColor(status))}>
              <Icon className={cn("h-4 w-4", getStatusColor(status))} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 