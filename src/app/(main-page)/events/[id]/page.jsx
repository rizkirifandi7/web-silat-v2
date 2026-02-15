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
  Loader2,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getEventById } from "@/lib/api/event";
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/axios";
import { toast } from "sonner";

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

// Mock data removed, fetching from API

const EventDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const user = useAuthStore((state) => state.user);

  const { data: eventResponse, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  const event = eventResponse?.data?.data || null;
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => api.post("/registrations", data),
    onSuccess: (res) => {
      // Jika event berbayar dan butuh pembayaran, jangan langsung sukses, tampilkan UI pembayaran
      if (res?.data?.requiresPayment) {
        toast.info("Ini adalah event berbayar. Silakan lakukan pembayaran.");
        setIsRegisterOpen(true);
      } else if (res?.data?.success) {
        toast.success("Pendaftaran berhasil!");
        setIsRegisterOpen(true);
      } else {
        toast.error(res?.data?.message || "Gagal mendaftar event.");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mendaftar event.");
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk mendaftar.");
      return;
    }
    mutation.mutate({
      eventId: id,
      userId: user.id,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
            Memuat Event...
          </p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase italic mb-4">
            Event Tidak Ditemukan
          </h2>
          <Button asChild>
            <Link href="/events">Kembali ke Agenda</Link>
          </Button>
        </div>
      </div>
    );
  }

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
                  <span>
                    {new Date(event.eventDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>
                    {new Date(event.eventDate).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    WIB
                  </span>
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
                src={event.imageUrl || "/pusamada-logo.png"}
                alt={event.title}
                fill
                className="object-cover bg-white"
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
                    disabled={
                      event.status !== "published" || mutation.isSuccess
                    }
                  >
                    <span className="skew-x-10">
                      {event.status !== "published"
                        ? "Pendaftaran Ditutup"
                        : mutation.isSuccess
                          ? "Sudah Terdaftar"
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
          {/* Jika pendaftaran sukses dan tidak butuh pembayaran, atau dialog konfirmasi awal */}
          {!mutation.isSuccess ||
          (mutation.data &&
            mutation.data.data &&
            mutation.data.data.requiresPayment) ? (
            <>
              {/* Jika sudah submit dan butuh pembayaran, tampilkan UI pembayaran */}
              {mutation.data &&
              mutation.data.data &&
              mutation.data.data.requiresPayment ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 border-2 border-yellow-600">
                    <Loader2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <DialogTitle className="text-2xl font-black uppercase italic">
                    Pembayaran Diperlukan
                  </DialogTitle>
                  <DialogDescription className="text-center max-w-xs mx-auto">
                    {mutation.data.data.message ||
                      "Ini adalah event berbayar. Silakan lakukan pembayaran untuk melanjutkan."}
                  </DialogDescription>
                  {/* Tombol bayar, bisa diarahkan ke payment gateway atau popup pembayaran */}
                  <Button
                    className="mt-4 rounded-none font-bold uppercase"
                    onClick={() => {
                      // TODO: Integrasi dengan payment gateway, misal redirect ke halaman pembayaran
                      window.location.href = `/payment?eventId=${id}`;
                    }}
                  >
                    Bayar Sekarang
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 rounded-none font-bold uppercase"
                    onClick={() => setIsRegisterOpen(false)}
                  >
                    Batal
                  </Button>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">
                      Konfirmasi Pendaftaran
                    </DialogTitle>
                    <DialogDescription>
                      Klik tombol di bawah untuk mendaftar pada event{" "}
                      <strong>{event.title}</strong>.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-6 space-y-4">
                    {!user ? (
                      <div className="bg-amber-50 border-2 border-amber-200 p-4 text-amber-800 text-sm font-medium">
                        Anda perlu login terlebih dahulu untuk mendaftar event
                        ini.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm py-2 border-b">
                          <span className="text-muted-foreground uppercase font-bold text-xs tracking-widest">
                            Nama
                          </span>
                          <span className="font-bold">{user.nama}</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b">
                          <span className="text-muted-foreground uppercase font-bold text-xs tracking-widest">
                            Email
                          </span>
                          <span className="font-bold">{user.email}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    {!user ? (
                      <Button
                        asChild
                        className="w-full rounded-none font-bold uppercase tracking-widest h-11"
                      >
                        <Link href="/login">Ke Halaman Login</Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleRegister}
                        disabled={mutation.isPending}
                        className="w-full rounded-none font-bold uppercase tracking-widest h-11"
                      >
                        {mutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Konfirmasi Pendaftaran"
                        )}
                      </Button>
                    )}
                  </DialogFooter>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 border-2 border-green-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogTitle className="text-2xl font-black uppercase italic">
                Pendaftaran Berhasil!
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                Terima kasih telah mendaftar.{" "}
                {event.isFree
                  ? "Pendaftaran Anda telah kami terima."
                  : "Silakan selesaikan pembayaran Anda untuk mengonfirmasi kehadiran."}
              </DialogDescription>
              <Button
                onClick={() => {
                  setIsRegisterOpen(false);
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
