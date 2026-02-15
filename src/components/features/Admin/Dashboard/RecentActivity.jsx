import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area"; // Opsional: jika list panjang

export function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <Card className="col-span-3 hover:shadow-md transition-shadow border-border/60 h-full">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Pendaftaran event terkini.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-center">
          <div className="text-muted-foreground text-sm">
            Belum ada aktivitas.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 hover:shadow-md transition-shadow border-border/60 h-full">
      <CardHeader>
        <CardTitle>Pendaftaran Terbaru</CardTitle>
        <CardDescription>User yang baru mendaftar event.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* ScrollArea bisa ditambahkan di sini jika data banyak */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start justify-between group">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border border-border group-hover:border-primary/50 transition-colors">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${activity.user?.nama}`}
                  />
                  <AvatarFallback className="text-xs">
                    {activity.user?.nama?.substring(0, 2).toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                    {activity.user?.nama || "User Tanpa Nama"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user?.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
                  {activity.event?.title || "Event"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
