"use client";

import React, { useState, useEffect } from "react";

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
  Loader2,
} from "lucide-react";
import Script from "next/script";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCampaignById, submitDonation } from "@/lib/api/donasi";
import { toast } from "sonner";

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

// Mock data removed, fetching from API

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

  const { data: campaignResponse, isLoading } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
    enabled: !!id,
  });

  const campaign = campaignResponse?.data?.data || null;
  const progress = campaign ? campaign.percentageReached || 0 : 0;

  const [donationAmount, setDonationAmount] = useState("");
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    message: "",
  });
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  

  const mutation = useMutation({
    mutationFn: submitDonation,
    onSuccess: (response) => {
      const { midtransToken } = response.data.data;
      if (window.snap) {
        setIsDonateOpen(false);
        window.snap.pay(midtransToken, {
          onSuccess: (result) => {
            toast.success("Donasi berhasil! Terima kasih atas dukungan Anda.");
          },
          onPending: (result) => {
            toast.info(
              "Pembayaran tertunda. Silakan selesaikan pembayaran Anda.",
            );
          },
          onError: (result) => {
            toast.error("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            toast.warning("Anda menutup jendela pembayaran sebelum selesai.");
          },
        });
      } else {
        toast.error(
          "Sistem pembayaran sedang tidak tersedia. Mohon segarkan halaman ini.",
        );
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat memproses donasi.",
      );
    },
  });

  // Reset mutation state when dialog is opened
useEffect(() => {
  if (isDonateOpen && mutation.isSuccess) {
    mutation.reset();
  }
}, [isDonateOpen]);

  // Quick preset handler
  const handlePresetClick = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handleDonate = (e) => {
    e.preventDefault();
    mutation.mutate({
      campaignId: id,
      amount: donationAmount,
      ...formData,
      paymentMethod: "midtrans", // Default according to backend
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
            Memuat Campaign...
          </p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase italic mb-4">
            Campaign Tidak Ditemukan
          </h2>
          <Button asChild>
            <Link href="/donasi">Kembali ke Daftar Donasi</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

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
                {campaign.status === "completed" ||
                (campaign.daysLeft !== null && campaign.daysLeft < 0) ? (
                  <Badge className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1 rounded-none skew-x-[-10deg]">
                    <span className="skew-x-10">Selesai</span>
                  </Badge>
                ) : (
                  <span className="flex items-center text-sm text-zinc-300 font-medium bg-zinc-800/50 px-3 py-1 rounded-none border border-zinc-700">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    {campaign.daysLeft || 0} hari tersisa
                  </span>
                )}
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
                src={campaign.imageUrl || "/pusamada-logo.png"}
                alt={campaign.title}
                fill
                className="object-cover bg-center bg-white"
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
                  Donatur ({campaign.donations?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="cerita"
                className="mt-6 animate-in fade-in slide-in-from-top-2"
              >
                <div
                  className="prose prose-lg prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                />
              </TabsContent>

              <TabsContent
                value="donatur"
                className="mt-6 animate-in fade-in slide-in-from-top-2"
              >
                <div className="space-y-4">
                  {(campaign.donations || []).map((donor, idx) => (
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
                            {donor.isAnonymous
                              ? "Hamba Allah"
                              : donor.donorName}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            {new Date(donor.paidAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="font-black text-primary text-lg md:text-xl">
                        {formatCurrency(donor.amount)}
                      </span>
                    </div>
                  ))}
                  {(!campaign.donations || campaign.donations.length === 0) && (
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
                        {formatCurrency(campaign.currentAmount)}
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
                      <span>
                        Target: {formatCurrency(campaign.targetAmount)}
                      </span>
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
          {!mutation.isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">
                  Lengkapi Data Donasi
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <form onSubmit={handleDonate} className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Nama Donatur
                  </Label>
                  <Input
                    placeholder="Nama (atau tulis 'Hamba Allah')"
                    required
                    value={formData.donorName}
                    onChange={(e) =>
                      setFormData({ ...formData, donorName: e.target.value })
                    }
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Email (Optional)
                  </Label>
                  <Input
                    type="email"
                    placeholder="Untuk laporan penggunaan dana"
                    value={formData.donorEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, donorEmail: e.target.value })
                    }
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase font-bold text-xs tracking-widest text-primary">
                    Doa / Dukungan (Optional)
                  </Label>
                  <Input
                    placeholder="Tuliskan doa terbaik Anda..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="rounded-none border-2 h-11 bg-muted/20 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full rounded-none font-bold uppercase tracking-widest h-12 shadow-md"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Bayar Sekarang"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 border-2 border-green-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogTitle className="text-2xl font-black uppercase italic">
                Selesaikan Pembayaran
              </DialogTitle>
              <DialogDescription className="text-center max-w-xs mx-auto">
                Silakan selesaikan pembayaran Anda melalui jendela sistem
                pembayaran yang muncul.
              </DialogDescription>

              <Button
                onClick={() => {
                  setIsDonateOpen(false);
                }}
                variant="outline"
                className="w-full mt-4 rounded-none border-2 font-bold uppercase"
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

export default DonasiDetailPage;
