"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Share2, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/lib/api/donasi";
import { Loader2 } from "lucide-react";

// Mock Data for Donation Campaigns
// Campaigns will be fetched from API

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const DonasiPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });

  const campaigns = data?.data?.data || [];

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* 1. Page Header */}
      <section className="relative pt-32 pb-10 overflow-hidden bg-background flex items-center justify-center min-h-[40vh]">
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
              Mari Berkontribusi
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Dukungan & <span className="text-primary">Donasi</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Mari bersama-sama berkontribusi dalam melestarikan budaya dan
            memajukan prestasi generasi muda.
          </p>
        </div>
      </section>

      {/* 3. Campaign List */}
      <section className="w-full max-w-7xl mx-auto px-4 my-12">
        <div className="flex items-center justify-between mb-12 border-b border-zinc-800 pb-4">
          <h2 className="text-4xl font-black uppercase italic">
            Program <span className="text-primary">Unggulan</span>
          </h2>
          {/* Future: Add Filter logic here if needed */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
                Memuat Program Donasi...
              </p>
            </div>
          ) : campaigns.length > 0 ? (
            campaigns.map((item) => {
              const progress = item.percentageReached || 0;

              return (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-2 border-border shadow-none hover:shadow-xl hover:border-primary p-0 gap-0 transition-all duration-300 flex flex-col h-full bg-card rounded-none"
                >
                  <div className="relative aspect-video overflow-hidden bg-white dark:bg-zinc-900 border-b-2 border-border group-hover:border-primary transition-colors">
                    <Image
                      src={item.imageUrl || "/pusamada-logo.png"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-0 left-0 p-3">
                      <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-2 py-1 skew-x-[-10deg] shadow-md inline-block">
                        <span className="skew-x-10 inline-block">
                          {item.category}
                        </span>
                      </span>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2 uppercase italic">
                      <Link href={`/donasi/${item.id}`}>{item.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-4 grow flex flex-col justify-end">
                    <div className="space-y-6">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm items-end">
                          <span className="font-black text-2xl text-primary italic">
                            {Math.round(progress)}%
                          </span>
                          <span className="text-muted-foreground text-xs uppercase font-bold tracking-wider">
                            {item.status === "completed" ||
                            (item.daysLeft !== null && item.daysLeft < 0) ? (
                              <span className="text-red-500">Selesai</span>
                            ) : (
                              <>
                                <span className="text-foreground">
                                  {item.daysLeft || 0}
                                </span>{" "}
                                hari lagi
                              </>
                            )}
                          </span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-3 rounded-none bg-zinc-800 [&>div]:bg-primary [&>div]:rounded-none"
                        />
                      </div>

                      {/* Amounts */}
                      <div className="flex justify-between items-end border-t border-dashed border-zinc-800 pt-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">
                            Terkumpul
                          </p>
                          <p className="font-bold text-foreground text-sm">
                            {formatCurrency(item.currentAmount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">
                            Target
                          </p>
                          <p className="font-bold text-muted-foreground text-sm">
                            {formatCurrency(item.targetAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 mt-auto gap-3">
                    <Button
                      asChild
                      className="w-full flex-1 font-bold uppercase tracking-widest rounded-none h-12 shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                      <Link href={`/donasi/${item.id}`}>Donasi Sekarang</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 h-12 w-12 rounded-none border-2 border-zinc-700 hover:bg-zinc-800 hover:text-white"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-800">
              <p className="text-muted-foreground uppercase font-bold tracking-widest">
                Belum ada program donasi aktif saat ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DonasiPage;
