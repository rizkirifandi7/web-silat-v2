"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRegistrationsByUser } from "@/lib/api/event";
import useAuthStore from "@/store/useAuthStore";
import { Calendar, MapPin, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function MemberEventsPage() {
  const { user } = useAuthStore();

  const { data: response, isLoading } = useQuery({
    queryKey: ["memberEvents", user?.id],
    queryFn: () => getRegistrationsByUser(user?.id),
    enabled: !!user?.id,
  });

  const registrations = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-bold text-muted-foreground uppercase tracking-widest text-sm">
          Memuat Riwayat Event...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground mb-2">
          Event Saya
        </h1>
        <p className="text-muted-foreground">
          Daftar event yang telah Anda ikuti.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-lg bg-muted/10">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Belum Ada Event
          </h3>
          <p className="text-muted-foreground mb-6">
            Anda belum mendaftar di event apapun.
          </p>
          <Button asChild className="skew-x-[-10deg] rounded-none">
            <Link href="/events">
              <span className="skew-x-10">Cari Event</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((registration) => {
            const event = registration.Event;
            if (!event) return null;

            return (
              <Card
                key={registration.id}
                className="group overflow-hidden border-2 border-border shadow-none hover:shadow-lg hover:border-primary p-0 gap-0 transition-all duration-300 flex flex-col h-full bg-card rounded-none"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b-2 border-border group-hover:border-primary transition-colors">
                  <Image
                    src={event.imageUrl || "/pusamada-logo.png"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 p-3 z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 skew-x-[-10deg] shadow-md border-2 inline-block bg-primary text-primary-foreground">
                      <span className="skew-x-10 inline-block">
                        {registration.status === "registered"
                          ? "Terdaftar"
                          : registration.status === "cancelled"
                            ? "Dibatalkan"
                            : registration.status}
                      </span>
                    </span>
                  </div>
                </div>

                <CardHeader className="p-5 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">
                    <Link href={`/events/${event.id}`}>{event.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-2 grow">
                  <CardDescription className="text-sm line-clamp-2 mb-4 text-muted-foreground">
                    {event.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">
                      Pembayaran:
                    </span>
                    <Badge
                      variant={
                        registration.paymentStatus === "paid"
                          ? "default"
                          : registration.paymentStatus === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="uppercase text-[10px]"
                    >
                      {registration.paymentStatus === "paid"
                        ? "Lunas"
                        : registration.paymentStatus === "pending"
                          ? "Menunggu"
                          : registration.paymentStatus}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 mt-auto">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-10 border-primary text-primary hover:bg-primary hover:text-white rounded-none skew-x-[-10deg] transition-all"
                  >
                    <Link href={`/events/${event.id}`}>
                      <span className="skew-x-10 flex items-center">
                        Detail Event
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
