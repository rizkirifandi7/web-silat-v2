"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/katalog";
import { Loader2 } from "lucide-react";

// Mock Data for Products
// Categories for filter

const categories = [
  "Semua",
  "Seragam",
  "Kaos",
  "Jaket",
  "Aksesoris",
  "Perlengkapan",
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const KatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", activeCategory, searchQuery],
    queryFn: () =>
      getProducts({ kategori: activeCategory, search: searchQuery }),
  });

  const products = data?.data || [];

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
              Official Store
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Katalog & <span className="text-primary">Merchandise</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Dapatkan perlengkapan latihan dan merchandise resmi PUSAMADA dengan
            kualitas terbaik.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 2. Sidebar Filter (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="bg-muted/30 p-6 border-2 border-border rounded-none">
              <h3 className="font-black text-xl mb-6 uppercase italic flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Pencarian
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk..."
                  className="pl-9 h-10 rounded-none border-2 border-zinc-700 bg-background focus-visible:ring-0 focus-visible:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-muted/30 p-6 border-2 border-border rounded-none">
              <h3 className="font-black text-xl mb-6 uppercase italic flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Kategori
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all flex justify-between items-center group border-l-4
                                   ${
                                     activeCategory === category
                                       ? "border-primary bg-primary/10 text-primary pl-6"
                                       : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground hover:border-zinc-500 hover:pl-5"
                                   }`}
                  >
                    {category}
                    {activeCategory === category && (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/10 border-2 border-primary border-dashed rounded-none">
              <h4 className="font-bold text-lg mb-2 uppercase italic text-primary">
                Butuh Bantuan?
              </h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Jika Anda bingung memilih ukuran atau produk, hubungi admin
                kami.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold uppercase tracking-widest border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-none"
              >
                Hubungi Admin
              </Button>
            </div>
          </aside>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed rounded-none uppercase font-bold tracking-widest"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter & Pencarian
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-zinc-950 border-r-2 border-primary"
              >
                <SheetHeader>
                  <SheetTitle className="text-left font-black uppercase italic text-white">
                    Filter Produk
                  </SheetTitle>
                </SheetHeader>
                <div className="py-8 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      Pencarian
                    </h4>
                    <Input
                      placeholder="Cari produk..."
                      value={searchQuery}
                      className="h-10 rounded-none border-2 border-zinc-700 bg-background focus-visible:ring-0 focus-visible:border-primary"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      Kategori
                    </h4>
                    <div className="flex flex-col gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            activeCategory === category ? "default" : "ghost"
                          }
                          onClick={() => setActiveCategory(category)}
                          className={`justify-start h-10 rounded-none font-bold uppercase tracking-wider ${activeCategory === category ? "bg-primary text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* 3. Product Grid Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-8 flex items-center justify-between border-b pb-4 border-dashed border-zinc-700">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Menampilkan{" "}
                <strong className="text-foreground">{products.length}</strong>{" "}
                produk{" "}
                {activeCategory !== "Semua"
                  ? `di kategori ${activeCategory}`
                  : ""}
              </p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
                  Memuat Produk...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-none border-2 border-border bg-card shadow-none p-0 hover:border-primary hover:shadow-[8px_8px_0px_0px_var(--color-primary)] transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white dark:bg-zinc-900/50 border-b-2 border-border group-hover:border-primary transition-colors">
                      <Image
                        src={product.imageUrl}
                        alt={product.nama}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500 will-change-transform"
                      />

                      {/* Tags */}
                      <div className="absolute top-0 left-0 p-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-2 py-1 skew-x-[-10deg] shadow-md">
                            Baru
                          </span>
                        )}
                      </div>

                      {/* Quick Action Overlay (Desktop) */}
                      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                        <Button
                          asChild
                          size="sm"
                          className="w-full rounded-none h-12 font-bold uppercase tracking-widest"
                        >
                          <Link href={`/katalog/${product.id}`}>
                            Lihat Detail
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        {product.kategori}
                      </p>
                      <h3 className="text-base md:text-lg font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase italic mb-3">
                        <Link href={`/katalog/${product.id}`}>
                          {product.nama}
                        </Link>
                      </h3>

                      <div className="mt-auto pt-4 border-t border-dashed border-border flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg md:text-xl text-primary">
                            {formatCurrency(product.harga)}
                          </p>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="w-full rounded-none h-10 font-bold uppercase tracking-widest shadow-md hover:shadow-primary/20"
                        >
                          <Link href={`/katalog/${product.id}`}>
                            Beli Sekarang
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 border-2 border-dashed border-zinc-800 rounded-none bg-muted/10">
                <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-20" />
                <h3 className="text-xl font-black uppercase italic text-foreground mb-2">
                  Produk tidak ditemukan
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Coba cari dengan kata kunci lain atau kategori berbeda.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("Semua");
                    setSearchQuery("");
                  }}
                  className="rounded-none border-2 border-primary text-primary hover:bg-primary hover:text-white uppercase font-bold tracking-widest"
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default KatalogPage;
