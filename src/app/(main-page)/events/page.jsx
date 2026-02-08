"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock Data for Events
const events = [
  {
    id: 1,
    title: "Seminar Pencak Silat Internasional",
    date: "15 Agustus 2024",
    time: "08:00 - 16:00 WIB",
    location: "GOR Pajajaran, Bandung",
    price: "Rp 150.000",
    category: "Seminar",
    status: "Open Registration",
    image: "/pusamada-logo.png", // Placeholder
    description:
      "Seminar eksklusif membahas teknik dan filosofi Pencak Silat bersama para pendekar internasional.",
  },
  {
    id: 2,
    title: "Ujian Kenaikan Tingkat Periode II",
    date: "10 September 2024",
    time: "07:00 - Selesai",
    location: "Padepokan PUSAMADA",
    price: "Rp 50.000",
    category: "Ujian",
    status: "Coming Soon",
    image: "/pusamada-logo.png",
    description:
      "Ujian evaluasi dan kenaikan sabuk bagi seluruh anggota PUSAMADA yang telah memenuhi syarat.",
  },
  {
    id: 3,
    title: "Workshop Jurus Tunggal Baku",
    date: "25 September 2024",
    time: "09:00 - 15:00 WIB",
    location: "Aula Universitas Pendidikan Indonesia",
    price: "Rp 100.000",
    category: "Workshop",
    status: "Closed",
    image: "/pusamada-logo.png",
    description:
      "Bedah tuntas detail gerak Jurus Tunggal Baku untuk persiapan kompetisi seni.",
  },
  {
    id: 4,
    title: "Kejuaraan Antar Cabang PUSAMADA Cup",
    date: "20 Oktober 2024",
    time: "08:00 - Selesai",
    location: "GOR C-Tra Arena",
    price: "Gratis (Penonton)",
    category: "Kejuaraan",
    status: "Coming Soon",
    image: "/pusamada-logo.png",
    description:
      "Ajang kompetisi tahunan untuk mencari bibit-bibit atlet potensial dari seluruh cabang latihan.",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Open Registration":
      return "bg-green-600 text-white border-green-700";
    case "Coming Soon":
      return "bg-blue-600 text-white border-blue-700";
    case "Closed":
      return "bg-red-600 text-white border-red-700";
    default:
      return "bg-primary text-white border-primary";
  }
};

const categories = ["Semua", "Seminar", "Ujian", "Workshop", "Kejuaraan"];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("Semua");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "Semua" || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* 1. Page Header */}
      <section className="relative py-32 overflow-hidden bg-background flex items-center justify-center min-h-[40vh]">
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
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden border-2 border-border shadow-none hover:shadow-xl hover:border-primary p-0 gap-0 transition-all duration-300 flex flex-col h-full bg-card rounded-none"
              >
                <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b-2 border-border group-hover:border-primary transition-colors">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 p-3 z-10">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 skew-x-[-10deg] shadow-md border-2 inline-block ${getStatusColor(event.status)}`}
                    >
                      <span className="skew-x-10 inline-block">
                        {event.status}
                      </span>
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 z-10">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-md text-foreground rounded-none border border-zinc-700 font-bold uppercase tracking-wider text-[10px]"
                    >
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
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
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">{event.location}</span>
                    </div>
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
