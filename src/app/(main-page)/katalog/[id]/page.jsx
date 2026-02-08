"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Share2,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock Data
const productData = {
  1: {
    name: "Seragam Silat Standar IPSI",
    price: 250000,
    category: "Seragam",
    rating: 4.8,
    reviews: 124,
    stock: 50,
    images: [
      "/pusamada-logo.png", // Main image
      "/pusamada-logo.png", // Thumb 1
      "/pusamada-logo.png", // Thumb 2
      "/pusamada-logo.png", // Thumb 3
    ],
    description: `
      <p>Seragam pencak silat standar IPSI berkualitas tinggi, cocok untuk latihan rutin maupun pertandingan. Terbuat dari bahan drill yang kuat namun tetap nyaman dan menyerap keringat.</p>
      <br/>
      <p>Dirancang dengan jahitan ganda di titik-titik rawan sobek untuk ketahanan maksimal saat melakukan gerakan ekstrem seperti tendangan dan bantingan.</p>
    `,
    specs: [
      { label: "Bahan", value: "American Drill High Quality" },
      { label: "Warna", value: "Hitam Standar" },
      { label: "Kelengkapan", value: "Baju, Celana, Sabuk Putih" },
      { label: "Ukuran Tersedia", value: "S, M, L, XL, XXL" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  default: {
    name: "Produk Tidak Ditemukan",
    price: 0,
    category: "-",
    rating: 0,
    reviews: 0,
    stock: 0,
    images: ["/pusamada-logo.png"],
    description: "Detail produk tidak tersedia.",
    specs: [],
    sizes: [],
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CatalogDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const product =
    productData[id] || (Number(id) > 1 ? productData[1] : productData.default);

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < product.stock) setQuantity(quantity + 1);
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
            <Link href="/katalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Katalog
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 py-1 rounded-none skew-x-[-10deg]">
                  <span className="skew-x-10">{product.category}</span>
                </Badge>
                {product.stock > 0 ? (
                  <span className="flex items-center text-sm text-green-400 font-bold bg-green-900/20 px-3 py-1 rounded-none border border-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Stok Tersedia
                  </span>
                ) : (
                  <span className="flex items-center text-sm text-red-400 font-bold bg-red-900/20 px-3 py-1 rounded-none border border-red-800">
                    Stok Habis
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic mb-4 drop-shadow-xl leading-none">
                {product.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-8 relative z-10 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-white rounded-none border-4 border-zinc-200 overflow-hidden shadow-xl -skew-x-2">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm border-2 border-zinc-200 hover:text-primary hover:border-primary transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 bg-white border-2 shrink-0 transition-all ${
                    mainImage === img
                      ? "border-primary ring-2 ring-primary/20 scale-105 z-10"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & Purchase */}
          <div className="space-y-8">
            <div className="border-b-2 border-zinc-200 pb-8 space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-current"
                            : "text-zinc-300 fill-none"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    ({product.reviews} ulasan)
                  </span>
                </div>
                <div className="text-5xl font-black text-primary italic tracking-tighter">
                  {formatCurrency(product.price)}
                </div>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-6">
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <Label className="uppercase font-bold text-xs tracking-widest text-zinc-500">
                    Pilih Ukuran
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <div key={size} className="relative">
                        <input
                          type="radio"
                          name="size"
                          id={`size-${size}`}
                          value={size}
                          checked={selectedSize === size}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-zinc-200 bg-white font-bold text-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-lg peer-hover:border-zinc-400"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label className="uppercase font-bold text-xs tracking-widest text-zinc-500">
                  Jumlah
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-zinc-200 bg-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-none hover:bg-zinc-100 hover:text-primary"
                      onClick={() => handleQuantityChange("dec")}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    <div className="h-12 w-16 flex items-center justify-center border-x-2 border-zinc-200 font-black text-xl">
                      {quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-none hover:bg-zinc-100 hover:text-primary"
                      onClick={() => handleQuantityChange("inc")}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Sisa stok: {product.stock}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-lg font-black uppercase tracking-widest skew-x-[-10deg] shadow-lg shadow-primary/20 rounded-none transform hover:-translate-y-1 transition-all"
                disabled={product.stock === 0}
              >
                <span className="skew-x-10 flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  Beli Sekarang
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg font-bold uppercase tracking-widest rounded-none border-2 border-zinc-200 hover:border-primary hover:text-primary hover:bg-zinc-50"
              >
                + Keranjang
              </Button>
            </div>

            {/* Info Tabs */}
            <div className="pt-8">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="deskripsi"
              >
                <AccordionItem
                  value="deskripsi"
                  className="border-b-2 border-zinc-100"
                >
                  <AccordionTrigger className="text-lg font-bold uppercase tracking-wide hover:text-primary hover:no-underline py-4">
                    Deskripsi Produk
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-zinc dark:prose-invert text-muted-foreground leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="spesifikasi"
                  className="border-b-2 border-zinc-100"
                >
                  <AccordionTrigger className="text-lg font-bold uppercase tracking-wide hover:text-primary hover:no-underline py-4">
                    Spesifikasi
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-y-3">
                      {product.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-3 gap-4 py-2 border-b border-dashed border-zinc-200 last:border-0"
                        >
                          <span className="font-bold text-zinc-500 uppercase text-xs tracking-wider flex items-center">
                            {spec.label}
                          </span>
                          <span className="col-span-2 font-medium text-foreground">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="pengiriman"
                  className="border-b-2 border-zinc-100"
                >
                  <AccordionTrigger className="text-lg font-bold uppercase tracking-wide hover:text-primary hover:no-underline py-4">
                    Pengiriman & Garansi
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-1">
                          Pengiriman Cepat
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Dikirim dari Bandung. Estimasi 2-3 hari kerja untuk
                          Pulau Jawa.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-1">Garansi Produk</p>
                        <p className="text-sm text-muted-foreground">
                          Garansi retur 7 hari jika terdapat cacat produksi atau
                          ukuran tidak sesuai.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CatalogDetailPage;
