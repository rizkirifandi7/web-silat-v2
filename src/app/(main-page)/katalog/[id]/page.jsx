"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Truck, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

// Mock Data
const productData = {
  1: {
    name: "Seragam Latihan Standar IPSI",
    category: "Seragam",
    price: 250000,
    image: "/pusamada-logo.png",
    description:
      "Seragam latihan pencak silat standar IPSI dengan bahan drill berkualitas tinggi. Nyaman digunakan untuk latihan harian maupun pertandingan. Termasuk sabuk putih.",
    specs: [
      "Bahan: Drill Nagata / American Drill",
      "Warna: Hitam Pekat",
      "Jahitan: Ganda (Double Stitch)",
      "Kelengkapan: Baju, Celana, Sabuk Putih",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/pusamada-logo.png", "/pusamada-logo.png"],
  },
  2: {
    name: "Kaos Polo PUSAMADA Exclusive",
    category: "Kaos",
    price: 150000,
    image: "/pusamada-logo.png",
    description:
      "Kaos Polo eksklusif dengan bordir logo PUSAMADA. Cocok untuk kegiatan santai atau acara semi-formal organisasi.",
    specs: [
      "Bahan: Lacoste Cotton CVC",
      "Warna: Hitam / Putih",
      "Logo: Bordir Komputer",
      "Fitting: Regular Fit",
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    images: ["/pusamada-logo.png"],
  },
  3: {
    name: "Celana Pangsi Hitam",
    category: "Seragam",
    price: 120000,
    image: "/pusamada-logo.png",
    description:
      "Celana pangsi tradisional longgar yang nyaman untuk bergerak bebas. Dilengkapi dengan karet pinggang dan tali pengikat.",
    specs: [
      "Bahan: Drill Standard",
      "Model: Komprang / Pangsi",
      "Saku: Kanan & Kiri (Resleting)",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    images: ["/pusamada-logo.png"],
  },
  4: {
    name: "Ikat Kepala / Udeng Tradisional",
    category: "Aksesoris",
    price: 45000,
    image: "/pusamada-logo.png",
    description:
      "Ikat kepala motif batik tradisional untuk melengkapi penampilan saat pentas seni atau upacara.",
    specs: [
      "Bahan: Katun Batik",
      "Ukuran: All Size (Ikat Sendiri)",
      "Motif: Mega Mendung / Parang",
    ],
    sizes: ["All Size"],
    images: ["/pusamada-logo.png"],
  },
  5: {
    name: "Tas Serut Gymsack Logo",
    category: "Aksesoris",
    price: 85000,
    image: "/pusamada-logo.png",
    description:
      "Tas serut praktis untuk membawa perlengkapan latihan ringan seperti baju ganti dan botol minum.",
    specs: [
      "Bahan: Taslan Waterproof",
      "Ukuran: 45 x 35 cm",
      "Sablon: Plastisol",
    ],
    sizes: ["All Size"],
    images: ["/pusamada-logo.png"],
  },
  6: {
    name: "Jaket Hoodie Zipper",
    category: "Jaket",
    price: 275000,
    image: "/pusamada-logo.png",
    description:
      "Jaket hoodie dengan resleting depan, bahan fleece tebal yang hangat dan nyaman.",
    specs: [
      "Bahan: Cotton Fleece 280gsm",
      "Warna: Navy / Hitam",
      "Saku: Depan Kanan Kiri",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    images: ["/pusamada-logo.png"],
  },
  7: {
    name: "Pecing Pad Target Tendangan",
    category: "Perlengkapan",
    price: 185000,
    image: "/pusamada-logo.png",
    description:
      "Target tendangan (pecing pad) ukuran sedang, awet dan kuat menahan benturan.",
    specs: [
      "Bahan Luar: Kulit Sintetis Murano",
      "Isi: Busa Rebonded Padat",
      "Ukuran: 50 x 35 cm",
    ],
    sizes: ["All Size"],
    images: ["/pusamada-logo.png"],
  },
  8: {
    name: "Body Protector Silat Standard",
    category: "Perlengkapan",
    price: 350000,
    image: "/pusamada-logo.png",
    description:
      "Pelindung badan (body protector) standar latihan, aman untuk sparring ringan.",
    specs: [
      "Bahan: Kulit Sintetis",
      "Warna: Hitam Polos",
      "Ukuran: Adjustable Velcro",
    ],
    sizes: ["Remaja", "Dewasa"],
    images: ["/pusamada-logo.png"],
  },
  // Fallback
  default: {
    name: "Produk Tidak Ditemukan",
    category: "Umum",
    price: 0,
    image: "/pusamada-logo.png",
    description: "Mohon maaf, produk ini tidak tersedia.",
    specs: [],
    sizes: [],
    images: [],
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
  const product = productData[id] || productData.default;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "-");
  const [mainImage, setMainImage] = useState(product.image);

  const handleWhatsAppBuy = () => {
    const message = `Halo Admin PUSAMADA, saya ingin membeli:\n\n*${product.name}*\nUkuran: ${selectedSize}\nHarga: ${formatCurrency(product.price)}\n\nMohon info ketersediaan stok & ongkir. Terima kasih.`;
    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-background pb-20 pt-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all"
          >
            <Link href="/katalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Katalog
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-border">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden bg-white shrink-0 ${mainImage === img ? "border-primary" : "border-transparent hover:border-border"}`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(product.price)}
              </div>
            </div>

            <Separator />

            {/* Variants */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Ukuran:
                </label>
                <ToggleGroup
                  type="single"
                  value={selectedSize}
                  onValueChange={(val) => val && setSelectedSize(val)}
                  className="justify-start"
                >
                  {product.sizes.map((size) => (
                    <ToggleGroupItem
                      key={size}
                      value={size}
                      className="h-10 w-10 rounded-lg border border-input data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                    >
                      {size}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {product.specs && (
                <div className="bg-muted/50 rounded-xl p-4 text-sm space-y-2">
                  <p className="font-semibold mb-2">Spesifikasi:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                size="lg"
                className="w-full text-base h-12 gap-2"
                onClick={handleWhatsAppBuy}
              >
                <MessageCircle className="w-5 h-5" />
                Beli via WhatsApp
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Admin akan membantu proses pemesanan & cek ongkir.
              </p>
            </div>

            {/* Features / Trust */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    Official Merch
                  </p>
                  <p className="text-muted-foreground">100% Asli PUSAMADA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    Kirim Seluruh Indo
                  </p>
                  <p className="text-muted-foreground">Via JNE / J&T</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CatalogDetailPage;
