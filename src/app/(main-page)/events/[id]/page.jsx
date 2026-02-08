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
    <main className="min-h-screen bg-background pb-20 pt-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all"
          >
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Agenda
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-lg border border-border">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary/90 hover:bg-primary text-white border-none text-base px-4 py-1">
                  {event.category}
                </Badge>
              </div>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain p-12 bg-white"
              />
            </div>

            {/* Title & Meta for Mobile (Hidden on Desktop usually, but good to keep inline here) */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm md:text-base">
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

            <div className="w-full h-px bg-border" />

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">Deskripsi Kegiatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Itinerary */}
            {event.itinerary && event.itinerary.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Jadwal Kegiatan</h3>
                <div className="space-y-4">
                  {event.itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="w-32 shrink-0 font-semibold text-primary">
                        {item.time}
                      </div>
                      <div className="text-foreground">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Pemateri / Tamu</h3>
                <div className="flex flex-wrap gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 bg-muted rounded-full"
                    >
                      <User className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{speaker}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Harga Tiket
                  </p>
                  <div className="text-3xl font-bold text-primary">
                    {event.price === 0
                      ? "Gratis"
                      : new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(event.price)}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <Button
                    size="lg"
                    className="w-full text-base font-bold shadow-lg shadow-primary/20"
                    onClick={() => setIsRegisterOpen(true)}
                    disabled={event.status === "Closed"}
                  >
                    {event.status === "Closed"
                      ? "Pendaftaran Ditutup"
                      : "Daftar Sekarang"}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Event
                  </Button>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <p className="font-semibold text-sm">Fasilitas Peserta:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>E-Sertifikat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Makan Siang & Snack</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Materi Seminar</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Help */}
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-sm font-medium mb-1">Butuh Bantuan?</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Hubungi panitia jika ada pertanyaan.
                </p>
                <Button variant="link" className="h-auto p-0 text-primary">
                  Hubungi WhatsApp Panitia
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Formulir Pendaftaran</DialogTitle>
                <DialogDescription>
                  Lengkapi data diri Anda untuk mendaftar pada event{" "}
                  <strong>{event.title}</strong>.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleRegister} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Sesuai KTP/Kartu Pelajar"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">No. WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0812xxxx"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Kategori Peserta</Label>
                  <RadioGroup defaultValue="umum">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="umum" id="r1" />
                      <Label htmlFor="r1">Umum</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="member" id="r2" />
                      <Label htmlFor="r2">Anggota PUSAMADA</Label>
                    </div>
                  </RadioGroup>
                </div>

                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full">
                    Konfirmasi Pendaftaran
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogTitle className="text-2xl">
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
                className="mt-4"
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
