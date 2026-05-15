"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRegistrationsByEvent, getEventById } from "@/lib/api/event";
import { DataTable } from "@/components/common/Table/DataTable";
import { columnsParticipant } from "./ColumnParticipant";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EventParticipantsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const { data: eventData, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });

  const { data: participantsData, isLoading: isLoadingParticipants } = useQuery(
    {
      queryKey: ["eventParticipants", eventId],
      queryFn: () => getRegistrationsByEvent(eventId),
      enabled: !!eventId,
    },
  );

  const event = eventData?.data || null;
  const participants = participantsData?.data || [];
  const isLoading = isLoadingEvent || isLoadingParticipants;

  console.log(participants);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/event")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Peserta Event</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            {!isLoadingEvent && event ? (
              <>
                Daftar peserta untuk{" "}
                <strong className="text-foreground">{event.title}</strong>
              </>
            ) : (
              "Memuat data event..."
            )}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-md border">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">
              Memuat data peserta...
            </p>
          </div>
        ) : (
          <div className="p-4">
            <DataTable columns={columnsParticipant} data={participants} />
          </div>
        )}
      </div>
    </div>
  );
}
