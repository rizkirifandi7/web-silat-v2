import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatsCard({
  title,
  value,
  icon,
  description,
  className,
  color = "primary",
}) {
  const colorVariants = {
    primary: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    success:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    warning:
      "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    danger: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md border-l-4",
        {
          "border-l-blue-500": color === "primary",
          "border-l-green-500": color === "success",
          "border-l-orange-500": color === "warning",
          "border-l-red-500": color === "danger",
          "border-l-purple-500": color === "purple",
        },
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn("p-2 rounded-full", colorVariants[color])}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
