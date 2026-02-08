"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Filter, Search, X, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock Data
const galleryItems = [
  {
    id: 1,
    category: "Latihan",
    src: "/pusamada-logo.png", // Placeholder
    title: "Latihan Rutin Mingguan",
    date: "12 Jan 2024",
    description: "Para anggota sedang berlatih teknik dasar di padepokan.",
  },
  {
    id: 2,
    category: "Kejuaraan",
    src: "/pusamada-logo.png",
    title: "Juara Umum Kejurda",
    date: "15 Feb 2024",
    description:
      "Tim PUSAMADA berhasil meraih juara umum pada Kejurda tahun ini.",
  },
  {
    id: 3,
    category: "Sosial",
    src: "/pusamada-logo.png",
    title: "Bakti Sosial Ramadhan",
    date: "10 Mar 2024",
    description: "Berbagi takjil dan sembako kepada masyarakat sekitar.",
  },
  {
    id: 4,
    category: "Upacara",
    src: "/pusamada-logo.png",
    title: "Upacara Kenaikan Sabuk",
    date: "20 Apr 2024",
    description:
      "Prosesi kenaikan tingkat bagi para siswa yang telah lulus ujian.",
  },
  {
    id: 5,
    category: "Latihan",
    src: "/pusamada-logo.png",
    title: "Latihan Gabungan",
    date: "5 Mei 2024",
    description:
      "Latihan bersama dengan perguruan sahabat untuk mempererat tali silaturahmi.",
  },
  {
    id: 6,
    category: "Kejuaraan",
    src: "/pusamada-logo.png",
    title: "Seleksi Atlet Nasional",
    date: "12 Jun 2024",
    description: "Dua atlet PUSAMADA lolos seleksi untuk mewakili provinsi.",
  },
];

const categories = ["Semua", "Latihan", "Kejuaraan", "Sosial", "Upacara"];

const GaleriPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
              Galeri Kami
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Dokumentasi <span className="text-primary">Kegiatan</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Merekam jejak perjuangan, prestasi, dan kebersamaan keluarga besar
            Pusaka Mande Muda Indonesia.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 mt-8">
        {/* 2. Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-none skew-x-[-10deg] px-8 py-6 text-base font-bold transition-all duration-300 border-2 ${
                activeCategory === category
                  ? "bg-primary text-white border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                  : "bg-transparent text-muted-foreground border-muted-foreground/30 hover:border-primary hover:text-primary"
              }`}
            >
              <span className="skew-x-10">{category}</span>
            </Button>
          ))}
        </div>

        {/* 3. Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-none border-2 border-border bg-card overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted/20">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay Icon Only */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-primary/90 text-primary-foreground p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Card Content - Always Visible */}
              <div className="p-5 border-t-2 border-border bg-background relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-border skew-x-[-10deg] -mt-4 mr-4 hidden md:block"></div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-none skew-x-[-10deg]">
                    <span className="skew-x-10">{item.category}</span>
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-black text-xl leading-tight uppercase italic text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-32 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <p className="text-xl font-medium">
              Belum ada dokumentasi untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* 4. Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[95vw] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl p-0 overflow-hidden bg-zinc-950 border-zinc-800 shadow-2xl rounded-none"
        >
          <div className="sr-only">
            <DialogTitle>{selectedImage?.title || "Detail Galeri"}</DialogTitle>
            <DialogDescription>
              {selectedImage?.description || "Deskripsi foto kegiatan"}
            </DialogDescription>
          </div>

          <div className="relative flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {selectedImage && (
              <>
                {/* Image Section */}
                <div className="relative w-full md:w-2/3 bg-black/50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                  <div className="relative w-full h-full min-h-[40vh]">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/3 bg-zinc-900 border-l border-zinc-800 p-8 flex flex-col overflow-y-auto">
                  <div className="mt-8 md:mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-none skew-x-[-10deg] mb-6">
                      <span className="skew-x-10">
                        {selectedImage.category}
                      </span>
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight uppercase italic">
                      {selectedImage.title}
                    </h2>
                    <div className="flex items-center gap-2 text-zinc-400 mb-8">
                      <span className="text-sm font-medium tracking-wide">
                        {selectedImage.date}
                      </span>
                    </div>
                    <div className="w-full h-px bg-zinc-800 mb-8"></div>
                    <p className="text-lg text-zinc-300 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default GaleriPage;
