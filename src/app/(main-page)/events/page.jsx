"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/api/event";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock Data for Events
// Mock data removed, fetching from API

const getStatusColor = (status) => {
  switch (status) {
    case "published":
      return "bg-green-600 text-white border-green-700";
    case "ongoing":
      return "bg-blue-600 text-white border-blue-700";
    case "completed":
      return "bg-zinc-600 text-white border-zinc-700";
    case "cancelled":
      return "bg-red-600 text-white border-red-700";
    case "draft":
      return "bg-zinc-400 text-white border-zinc-500";
    default:
      return "bg-primary text-white border-primary";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "published":
      return "Pendaftaran Dibuka";
    case "ongoing":
      return "Sedang Berlangsung";
    case "completed":
      return "Selesai";
    case "cancelled":
      return "Dibatalkan";
    case "draft":
      return "Draft";
    default:
      return status;
  }
};

const categories = ["Semua", "Seminar", "Ujian", "Workshop", "Kejuaraan"];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("Semua");
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: eventsResponse, isLoading } = useQuery({
    queryKey: ["events", activeCategory, searchQuery],
    queryFn: () =>
      getEvents({
        category: activeCategory !== "Semua" ? activeCategory : undefined,
        search: searchQuery || undefined,
        status: "published", // Show only published events to public
      }),
  });

  const events = eventsResponse?.data?.data || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* 1. Page Header */}
      <section className="relative  pt-32 pb-10 overflow-hidden bg-background flex items-center justify-center min-h-[40vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/bg-2.webp"
            alt="Martial Arts Background"
            fill
            className="object-cover object-center opacity-30 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-block relative mb-4">
            <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
            <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
              Agenda Kegiatan
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Jadwal & <span className="text-primary">Event</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Ikuti berbagai kegiatan, seminar, dan kejuaraan untuk meningkatkan
            kemapuan dan mempererat persaudaraan.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search */}
      <section className="w-full max-w-7xl mx-auto px-4 my-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-none skew-x-[-10deg] px-6 text-sm font-bold uppercase transition-all duration-300 border-2 ${
                  activeCategory === category
                    ? "bg-primary text-white border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                    : "bg-transparent text-muted-foreground border-muted-foreground/30 hover:border-primary hover:text-primary"
                }`}
              >
                <span className="skew-x-10">{category}</span>
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-12 rounded-none border-2 border-zinc-800 bg-background focus-visible:ring-0 focus-visible:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 3. Event List */}
      <section className="w-full max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
              Memuat Agenda...
            </p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden border-2 border-border shadow-none hover:shadow-xl hover:border-primary p-0 gap-0 transition-all duration-300 flex flex-col h-full bg-card rounded-none"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b-2 border-border group-hover:border-primary transition-colors">
                  <Image
                    src={event.imageUrl || "/pusamada-logo.png"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-0 right-0 p-3 z-10">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 skew-x-[-10deg] shadow-md border-2 inline-block ${getStatusColor(
                        event.status,
                      )}`}
                    >
                      <span className="skew-x-10 inline-block">
                        {getStatusLabel(event.status)}
                      </span>
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 z-10">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-md text-foreground rounded-none border border-zinc-700 font-bold uppercase tracking-wider text-[10px]"
                    >
                      {event.eventType}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase italic mb-2">
                    <Link href={`/events/${event.id}`}>{event.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-2 grow">
                  <CardDescription className="text-sm line-clamp-3 mb-6 text-muted-foreground leading-relaxed">
                    {event.description}
                  </CardDescription>
                  <div className="space-y-3 text-sm text-zinc-400 border-t border-dashed border-zinc-800 pt-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {new Date(event.eventDate).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        WIB
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Harga Tiket
                    </span>
                    <span className="text-sm font-black text-primary italic">
                      {event.isFree ? "GRATIS" : formatCurrency(event.price)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button
                    asChild
                    className="w-full group/btn h-12 rounded-none border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest bg-transparent"
                    variant="outline"
                  >
                    <Link href={`/events/${event.id}`}>
                      Lihat Detail
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-muted-foreground border-2 border-dashed border-zinc-800 rounded-none bg-muted/10">
            <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-black uppercase italic text-foreground mb-2">
              Tidak ada event
            </h3>
            <p className="text-lg text-muted-foreground">
              Tidak ada event yang ditemukan untuk kategori atau pencarian ini.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default EventsPage;
