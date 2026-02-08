"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  CheckCircle2,
  Heart,
  User,
  Shield,
  Clock,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock Data
const campaignData = {
  1: {
    title: "Renovasi Padepokan Pusat",
    category: "Infrastruktur",
    target: 500000000,
    collected: 175000000,
    donorCount: 124,
    daysLeft: 45,
    image: "/pusamada-logo.png",
    description:
      "Padepokan Pusat PUSAMADA telah menjadi saksi bisu lahirnya ribuan pesilat tangguh. Namun, kondisi bangunan yang sudah tua memerlukan peremajaan agar tetap aman dan nyaman digunakan.",
    story: `
      <p>Padepokan Pusat PUSAMADA adalah jantung dari kegiatan perguruan kami. Di sinilah nilai-nilai luhur dan teknik bela diri diwariskan dari generasi ke generasi. Namun, seiring berjalannya waktu, beberapa bagian bangunan mengalami kerusakan yang cukup signifikan.</p>
      <br/>
      <p>Atap aula latihan mulai bocor saat hujan deras, lantai kayu yang mulai lapuk membahayakan keselamatan siswa, dan fasilitas sanitasi yang perlu perbaikan mendesak. Kami mengajak Anda, para alumni, anggota, dan simpatisan PUSAMADA untuk bahu-membahu dalam proyek renovasi ini.</p>
      <br/>
      <p>Dana yang terkumpul akan digunakan sepenuhnya untuk:</p>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>Perbaikan struktur atap dan plafon aula utama.</li>
        <li>Penggantian lantai latihan dengan standar keamanan yang lebih baik.</li>
        <li>Renovasi toilet dan ruang ganti siswa.</li>
        <li>Pengecatan ulang seluruh gedung.</li>
      </ul>
    `,
    donors: [
      { name: "Hamba Allah", amount: 1000000, time: "2 jam yang lalu" },
      { name: "Budi Santoso", amount: 500000, time: "5 jam yang lalu" },
      { name: "Alumni Angkatan 98", amount: 5000000, time: "1 hari yang lalu" },
    ],
  },
  default: {
    title: "Program Donasi PUSAMADA",
    category: "Umum",
    target: 100000000,
    collected: 0,
    donorCount: 0,
    daysLeft: 0,
    image: "/pusamada-logo.png",
    description:
      "Dukung program-program PUSAMADA untuk kemajuan Pencak Silat Indonesia.",
    story: "<p>Detail campaign belum tersedia.</p>",
    donors: [],
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const presetAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

const DonasiDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const campaign =
    campaignData[id] ||
    (Number(id) > 1 ? campaignData[1] : campaignData.default);
  const progress = Math.min((campaign.collected / campaign.target) * 100, 100);

  const [donationAmount, setDonationAmount] = useState("");
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick preset handler
  const handlePresetClick = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handleDonate = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background pb-20">
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
            <Link href="/donasi">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Donasi
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 py-1 rounded-none skew-x-[-10deg]">
                  <span className="skew-x-10">{campaign.category}</span>
                </Badge>
                <span className="flex items-center text-sm text-zinc-300 font-medium bg-zinc-800/50 px-3 py-1 rounded-none border border-zinc-700">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  {campaign.daysLeft} hari tersisa
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic mb-4 drop-shadow-xl leading-none">
                {campaign.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-8 relative z-10 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-none -skew-x-2 border-4 border-white shadow-2xl overflow-hidden bg-zinc-100">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-contain p-12 bg-white"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
            </div>

            {/* Story Tabs */}
            <Tabs defaultValue="cerita" className="w-full">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-0 mb-6 border-b-2 border-zinc-200">
                <TabsTrigger
                  value="cerita"
                  className="rounded-none py-3 px-8 text-lg font-bold uppercase tracking-wide data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary -mb-[2px] transition-all"
                >
                  Cerita
                </TabsTrigger>
                <TabsTrigger
                  value="donatur"
                  className="rounded-none py-3 px-8 text-lg font-bold uppercase tracking-wide data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary -mb-[2px] transition-all"
                >
                  Donatur ({campaign.donorCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="cerita"
                className="mt-6 animate-in fade-in slide-in-from-top-2"
              >
                <div
                  className="prose prose-lg prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: campaign.story }}
                />
              </TabsContent>

              <TabsContent
                value="donatur"
                className="mt-6 animate-in fade-in slide-in-from-top-2"
              >
                <div className="space-y-4">
                  {campaign.donors.map((donor, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 bg-white border-2 border-zinc-100 hover:border-primary/50 transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-foreground uppercase tracking-tight">
                            {donor.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {donor.time}
                          </p>
                        </div>
                      </div>
                      <span className="font-black text-primary text-lg md:text-xl">
                        {formatCurrency(donor.amount)}
                      </span>
                    </div>
                  ))}
                  {campaign.donors.length === 0 && (
                    <div className="text-center py-12 bg-muted/30 border-2 border-dashed border-zinc-300 rounded-lg">
                      <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">
                        Belum ada donatur terbaru.
                      </p>
                      <p className="text-sm text-zinc-400">
                        Jadilah yang pertama berkontribusi!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border-l-4 border-primary shadow-xl p-8 relative overflow-hidden dark:bg-zinc-900/50">
                {/* Progress Stats */}
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase mb-1">
                      Terkumpul
                    </p>
                    <div className="flex justify-between items-baseline">
                      <span className="text-4xl font-black text-primary tracking-tight">
                        {formatCurrency(campaign.collected)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress
                      value={progress}
                      className="h-4 rounded-none bg-zinc-200"
                    />
                    <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
                      <span>{Math.round(progress)}% tercapai</span>
                      <span>Target: {formatCurrency(campaign.target)}</span>
                    </div>
                  </div>
                </div>

                {/* Donation Input */}
                <div className="space-y-6">
                  <div className="p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 relative">
                    <Label className="uppercase font-bold text-xs tracking-widest text-primary mb-2 block">
                      Masukkan Nominal
                    </Label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-zinc-400 text-lg pl-3">
                        Rp
                      </span>
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-12 h-12 text-xl font-bold bg-transparent border-none shadow-none focus-visible:ring-0"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Presets */}
                  <div className="grid grid-cols-3 gap-2">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handlePresetClick(amt)}
                        className={`py-2 px-1 text-xs md:text-sm font-bold uppercase tracking-wide border-2 transition-all ${
                          donationAmount === amt.toString()
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-zinc-200 hover:border-primary/50 hover:text-primary"
                        }`}
                      >
                        {amt / 1000}k
                      </button>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-black uppercase tracking-widest skew-x-[-10deg] shadow-lg shadow-primary/20 rounded-none transform hover:-translate-y-1 transition-all"
                    onClick={() => setIsDonateOpen(true)}
                    disabled={!donationAmount || Number(donationAmount) < 10000}
                  >
                    <span className="skew-x-10 flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-current" />
                      Lanjut Pembayaran
                    </span>
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 py-3 rounded-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Pembayaran 100% Aman & Terverifikasi</span>
                </div>
              </div>

              <div className="border-2 border-blue-100 bg-blue-50/50 p-6 flex gap-4 items-start rounded-none">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide mb-2">
                    Impact Donasi Anda
                  </h4>
                  <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                    Setiap rupiah yang Anda donasikan akan dilaporkan secara
                    transparan dan digunakan sesuai peruntukannya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Flow Dialog */}
      <Dialog open={isDonateOpen} onOpenChange={setIsDonateOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-none border-2 border-zinc-200">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">
                  Lengkapi Data Donasi
                </DialogTitle>
                <DialogDescription>
                  Anda akan berdonasi sebesar{" "}
                  <strong className="text-primary text-lg">
                    {formatCurrency(Number(donationAmount))}
                  </strong>
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleDonate} className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Nama Donatur
                  </Label>
                  <Input
                    placeholder="Nama (atau tulis 'Hamba Allah')"
                    required
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Email / WhatsApp (Optional)
                  </Label>
                  <Input
                    placeholder="Untuk laporan penggunaan dana"
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Doa / Dukungan (Optional)
                  </Label>
                  <Input
                    placeholder="Tuliskan doa terbaik Anda..."
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Metode Pembayaran
                  </Label>
                  <RadioGroup defaultValue="qris">
                    <div className="flex items-center justify-between p-3 border-2 rounded-none hover:bg-muted/30 hover:border-primary cursor-pointer transition-colors group">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="qris" id="bm1" />
                        <Label
                          htmlFor="bm1"
                          className="cursor-pointer font-bold group-hover:text-primary"
                        >
                          QRIS
                        </Label>
                      </div>
                      <Wallet className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex items-center justify-between p-3 border-2 rounded-none hover:bg-muted/30 hover:border-primary cursor-pointer transition-colors group">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="transfer" id="bm2" />
                        <Label
                          htmlFor="bm2"
                          className="cursor-pointer font-bold group-hover:text-primary"
                        >
                          Transfer Bank
                        </Label>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-zinc-200 rounded-sm"></div>
                        <div className="w-8 h-5 bg-zinc-200 rounded-sm"></div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    className="w-full rounded-none font-bold uppercase tracking-widest h-12 shadow-md"
                  >
                    Bayar Sekarang
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
                Instruksi Pembayaran
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                Silakan selesaikan pembayaran Anda dengan memindai kode QRIS
                berikut.
              </DialogDescription>

              <div className="aspect-square w-48 bg-white rounded-none flex items-center justify-center border-4 border-zinc-900 my-4 shadow-lg">
                <span className="text-muted-foreground text-xs font-mono">
                  QRIS Code Placeholder
                </span>
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                Total: {formatCurrency(Number(donationAmount))}
              </p>

              <Button
                onClick={() => {
                  setIsDonateOpen(false);
                  setIsSuccess(false);
                }}
                variant="outline"
                className="w-full mt-4 rounded-none border-2 font-bold uppercase"
              >
                Saya Sudah Bayar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default DonasiDetailPage;
