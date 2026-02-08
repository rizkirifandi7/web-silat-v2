import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-foreground pt-20 pb-10 overflow-hidden border-t-4 border-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand & About (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 p-2">
                <Image
                  src="/pusamada-logo.png"
                  alt="PUSAMADA Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl leading-none tracking-tighter text-white uppercase italic">
                  PUSAMADA
                </span>
                <span className="text-xs text-primary font-bold tracking-[0.2em] uppercase">
                  Indonesia
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Pusaka Mande Muda Indonesia. Melestarikan budaya pencak silat,
              membangun karakter generasi muda yang tangguh dan berakhlak mulia.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-none skew-x-[-10deg] border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5 skew-x-10" />
                </Button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 columns) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-black text-lg text-white uppercase italic mb-6 relative inline-block">
              Jelajahi
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary skew-x-[-10deg]" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Tentang Kami", href: "/tentang" },
                { label: "Event & Kejuaraan", href: "/events" },
                { label: "Galeri Kegiatan", href: "/galeri" },
                { label: "Berita Terkini", href: "/berita" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Layanan (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="font-black text-lg text-white uppercase italic mb-6 relative inline-block">
              Layanan
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary skew-x-[-10deg]" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Donasi", href: "/donasi" },
                { label: "Katalog Merchandise", href: "/katalog" },
                { label: "Pendaftaran Anggota", href: "/daftar" },
                { label: "Verifikasi Sertifikat", href: "/verify" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (Spans 4 columns) */}
          <div className="lg:col-span-3">
            <h3 className="font-black text-lg text-white uppercase italic mb-6 relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary skew-x-[-10deg]" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition-colors">
                  Kampung Sukarasa, Arjasari, Kab. Bandung
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-200 transition-colors">
                  (+62) 823-4393-6639
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-200 transition-colors">
                  info@pusamada.id
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-zinc-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium tracking-wide">
          <p className="text-center md:text-left">
            &copy; {currentYear}{" "}
            <span className="text-white font-bold uppercase">PUSAMADA</span>.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
