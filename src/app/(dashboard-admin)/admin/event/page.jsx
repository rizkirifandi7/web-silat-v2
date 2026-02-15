"use client";

import { MainEvent } from "@/components/features/Admin/Events/MainEvent";

export default function EventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event</h1>
        <p className="text-muted-foreground">
          Kelola jadwal event, seminar, dan kegiatan lainnya.
        </p>
      </div>

      <MainEvent />
    </div>
  );
}
