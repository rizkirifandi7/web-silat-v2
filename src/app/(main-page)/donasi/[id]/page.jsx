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
    <main className="min-h-screen bg-background pb-20 pt-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all"
          >
            <Link href="/donasi">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Donasi
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-lg border border-border">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-contain p-12 bg-white"
              />
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {campaign.category}
                </Badge>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {campaign.daysLeft} hari tersisa
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                {campaign.title}
              </h1>
            </div>

            {/* Story Tabs */}
            <Tabs defaultValue="cerita" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-muted rounded-xl">
                <TabsTrigger value="cerita" className="rounded-lg py-2.5 px-6">
                  Cerita
                </TabsTrigger>
                <TabsTrigger value="donatur" className="rounded-lg py-2.5 px-6">
                  Donatur ({campaign.donorCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="cerita"
                className="mt-6 animate-in fade-in slide-in-from-top-2"
              >
                <div
                  className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
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
                      className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {donor.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {donor.time}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-primary text-sm md:text-base">
                        {formatCurrency(donor.amount)}
                      </span>
                    </div>
                  ))}
                  {campaign.donors.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Belum ada donatur terbaru.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-xl shadow-primary/5">
                {/* Progress Stats */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-extrabold text-primary">
                      {formatCurrency(campaign.collected)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                      <span>{Math.round(progress)}% tercapai</span>
                      <span>Target: {formatCurrency(campaign.target)}</span>
                    </div>
                  </div>
                </div>

                {/* Donation Input */}
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-xl border border-border">
                    <Label className="text-xs text-muted-foreground mb-2 block">
                      Masukkan Nominal Donasi
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-10 h-12 text-lg font-bold bg-background border-input"
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
                        className={`py-2 px-1 text-xs md:text-sm font-medium rounded-lg border transition-all ${
                          donationAmount === amt.toString()
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        {amt / 1000}k
                      </button>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full text-base font-bold h-12 shadow-lg shadow-primary/25"
                    onClick={() => setIsDonateOpen(true)}
                    disabled={!donationAmount || Number(donationAmount) < 10000}
                  >
                    Lanjut Pembayaran
                  </Button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Pembayaran aman & terverifikasi</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-4 flex gap-4 items-start">
                <Heart className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-1">
                    Impact Donasi Anda
                  </h4>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80 leading-relaxed">
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
        <DialogContent className="sm:max-w-[450px]">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Lengkapi Data Donasi</DialogTitle>
                <DialogDescription>
                  Anda akan berdonasi sebesar{" "}
                  <strong>{formatCurrency(Number(donationAmount))}</strong>
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleDonate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nama Donatur</Label>
                  <Input
                    placeholder="Nama (atau tulis 'Hamba Allah')"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email / WhatsApp (Optional)</Label>
                  <Input placeholder="Untuk laporan penggunaan dana" />
                </div>
                <div className="space-y-2">
                  <Label>Doa / Dukungan (Optional)</Label>
                  <Input placeholder="Tuliskan doa terbaik Anda..." />
                </div>

                <div className="space-y-3 pt-2">
                  <Label>Metode Pembayaran</Label>
                  <RadioGroup defaultValue="qris">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="qris" id="bm1" />
                        <Label htmlFor="bm1" className="cursor-pointer">
                          QRIS
                        </Label>
                      </div>
                      <Wallet className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="bm2" />
                        <Label htmlFor="bm2" className="cursor-pointer">
                          Transfer Bank
                        </Label>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full">
                    Bayar Sekarang
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
                Instruksi Pembayaran
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                Silakan selesaikan pembayaran Anda dengan memindai kode QRIS
                berikut.
              </DialogDescription>

              <div className="aspect-square w-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 my-4">
                <span className="text-muted-foreground text-xs">
                  QRIS Code Placeholder
                </span>
              </div>

              <p className="text-sm font-semibold">
                Total: {formatCurrency(Number(donationAmount))}
              </p>

              <Button
                onClick={() => {
                  setIsDonateOpen(false);
                  setIsSuccess(false);
                }}
                variant="outline"
                className="w-full mt-4"
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
