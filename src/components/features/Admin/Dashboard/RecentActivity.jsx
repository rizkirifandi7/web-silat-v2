import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <Card className="col-span-3 lg:col-span-3 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>
            Belum ada aktivitas pendaftaran event terbaru.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 lg:col-span-3 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Pendaftaran Event Terbaru</CardTitle>
        <CardDescription>
          User yang baru saja mendaftar ke event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center group">
              <Avatar className="h-9 w-9 border-2 border-background group-hover:scale-110 transition-transform">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.user?.nama?.substring(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                  {activity.user?.nama || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.user?.email || "No email"}
                </p>
              </div>
              <div className="ml-auto font-medium text-xs text-muted-foreground text-right">
                Mendaftar di{" "}
                <span className="text-foreground font-semibold block sm:inline">
                  {activity.event?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
