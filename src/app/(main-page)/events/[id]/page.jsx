"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock Data (Should match the list page or specific detailed data)
const eventData = {
  1: {
    title: "Seminar Pencak Silat Internasional",
    date: "15 Agustus 2024",
    time: "08:00 - 16:00 WIB",
    location: "GOR Pajajaran, Bandung",
    price: 150000,
    category: "Seminar",
    status: "Open Registration",
    image: "/pusamada-logo.png",
    description:
      "Seminar eksklusif ini akan membahas secara mendalam teknik-teknik tingkat lanjut dan filosofi yang terkandung dalam Pencak Silat. Dipandu langsung oleh para pendekar internasional yang telah berpengalaman puluhan tahun.",
    itinerary: [
      { time: "08:00 - 08:30", activity: "Registrasi Ulang" },
      { time: "08:30 - 09:00", activity: "Opening Ceremony" },
      { time: "09:00 - 10:30", activity: "Sesi 1: Filosofi Gerak" },
      { time: "10:30 - 10:45", activity: "Coffee Break" },
      { time: "10:45 - 12:00", activity: "Sesi 2: Teknik Bantingan" },
      { time: "12:00 - 13:00", activity: "Ishoma" },
      { time: "13:00 - 15:30", activity: "Sesi 3: Aplikasi Bela Diri Praktis" },
      { time: "15:30 - 16:00", activity: "Penutupan & Foto Bersama" },
    ],
    speakers: [
      "Pendekar A (Belanda)",
      "Pendekar B (Indonesia)",
      "Pendekar C (USA)",
    ],
  },
  // Fallback for other IDs for demo purposes
  default: {
    title: "Event Tidak Ditemukan",
    date: "-",
    time: "-",
    location: "-",
    price: 0,
    category: "-",
    status: "Closed",
    image: "/pusamada-logo.png",
    description: "Mohon maaf, detail event ini tidak tersedia saat ini.",
    itinerary: [],
    speakers: [],
  },
};

const EventDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  // Simple logic to select data
  const event =
    eventData[id] || (Number(id) > 1 ? eventData[1] : eventData.default);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock submit handler
  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Header Section */}
      <section className="relative py-20 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-2.webp"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-background" />
        </div>
        <div className="container relative z-10 px-4 mx-auto pt-10">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all text-white hover:text-primary hover:bg-transparent mb-6"
          >
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Agenda
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 py-1 rounded-none skew-x-[-10deg]">
                <span className="skew-x-10">{event.category}</span>
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic mb-4 drop-shadow-xl leading-none">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-zinc-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-none -skew-x-2 border-4 border-white shadow-2xl overflow-hidden bg-zinc-100">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain p-12 bg-white"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
            </div>

            {/* Description */}
            <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
              <h3 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary block skew-x-[-10deg]"></span>
                Deskripsi Kegiatan
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Itinerary */}
            {event.itinerary && event.itinerary.length > 0 && (
              <div>
                <h3 className="text-2xl font-black uppercase italic mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary block skew-x-[-10deg]"></span>
                  Jadwal Kegiatan
                </h3>
                <div className="space-y-4">
                  {event.itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-none border-l-4 border-zinc-200 bg-muted/20 hover:bg-muted/40 transition-colors hover:border-primary"
                    >
                      <div className="w-32 shrink-0 font-bold text-primary text-lg font-mono">
                        {item.time}
                      </div>
                      <div className="text-foreground font-medium text-lg">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h3 className="text-2xl font-black uppercase italic mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary block skew-x-[-10deg]"></span>
                  Pemateri / Tamu
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm"
                    >
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-lg">{speaker}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Registration Card */}
              <div className="bg-card border-2 border-zinc-100 dark:border-zinc-800 rounded-none p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <div className="mb-8 text-center">
                  <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
                    Harga Tiket
                  </p>
                  <div className="text-4xl font-black text-primary italic tracking-tighter">
                    {event.price === 0
                      ? "GRATIS"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(event.price)}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Button
                    size="lg"
                    className="w-full h-12 text-base font-black uppercase tracking-widest skew-x-[-10deg] shadow-lg shadow-primary/20 rounded-none"
                    onClick={() => setIsRegisterOpen(true)}
                    disabled={event.status === "Closed"}
                  >
                    <span className="skew-x-10">
                      {event.status === "Closed"
                        ? "Pendaftaran Ditutup"
                        : "Daftar Sekarang"}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-12 font-bold uppercase tracking-widest rounded-none border-2 hover:bg-zinc-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Event
                  </Button>
                </div>

                <div className="space-y-4 pt-6 border-t-2 border-dashed border-zinc-200">
                  <p className="font-bold text-sm uppercase tracking-wide">
                    Fasilitas Peserta:
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>E-Sertifikat Resmi</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Makan Siang & Snack</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Materi Seminar Eksklusif</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Help */}
              <div className="bg-zinc-900 text-white rounded-none p-6 text-center -skew-x-2 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-800 skew-x-10" />
                <div className="relative skew-x-2">
                  <p className="font-bold uppercase tracking-widest mb-1">
                    Butuh Bantuan?
                  </p>
                  <p className="text-xs text-zinc-400 mb-4">
                    Hubungi panitia jika ada pertanyaan.
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary font-bold hover:text-white"
                  >
                    Hubungi WhatsApp Panitia
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none border-2 border-zinc-200">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">
                  Formulir Pendaftaran
                </DialogTitle>
                <DialogDescription>
                  Lengkapi data diri Anda untuk mendaftar pada event{" "}
                  <strong>{event.title}</strong>.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleRegister} className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="uppercase font-bold text-xs tracking-widest text-primary"
                  >
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Sesuai KTP/Kartu Pelajar"
                      className="pl-9 rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="uppercase font-bold text-xs tracking-widest text-primary"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="pl-9 rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="uppercase font-bold text-xs tracking-widest text-primary"
                  >
                    No. WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0812xxxx"
                      className="pl-9 rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Kategori Peserta
                  </Label>
                  <RadioGroup defaultValue="umum">
                    <div className="flex items-center space-x-2 border p-3 rounded-none hover:bg-muted/20 transition-colors cursor-pointer">
                      <RadioGroupItem value="umum" id="r1" />
                      <Label
                        htmlFor="r1"
                        className="cursor-pointer font-medium"
                      >
                        Umum
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-none hover:bg-muted/20 transition-colors cursor-pointer">
                      <RadioGroupItem value="member" id="r2" />
                      <Label
                        htmlFor="r2"
                        className="cursor-pointer font-medium"
                      >
                        Anggota PUSAMADA
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    className="w-full rounded-none font-bold uppercase tracking-widest h-11"
                  >
                    Konfirmasi Pendaftaran
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 border-2 border-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogTitle className="text-2xl font-black uppercase italic">
                Pendaftaran Berhasil!
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                Terima kasih telah mendaftar. Detail pembayaran dan info
                selanjutnya telah dikirim ke email Anda.
              </DialogDescription>
              <Button
                onClick={() => {
                  setIsRegisterOpen(false);
                  setIsSuccess(false);
                }}
                className="mt-4 rounded-none font-bold uppercase"
              >
                Tutup
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default EventDetailPage;
