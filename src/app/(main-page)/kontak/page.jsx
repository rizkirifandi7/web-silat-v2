import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const KontakPage = () => {
  return (
    <main className="min-h-screen bg-background pb-0">
      {/* 1. Page Header */}
      <section className="relative  pt-32 pb-10 overflow-hidden bg-background flex items-center justify-center min-h-[40vh]">
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
              Hubungi Kami
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Siap <span className="text-primary">Mendengar</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Jangan ragu untuk menghubungi kami untuk pertanyaan, pendaftaran,
            atau kerjasama.
          </p>
        </div>
      </section>

      {/* 2. Content Section (Info & Form) */}
      <section className="py-12 md:py-24 bg-background relative selection:bg-primary selection:text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-black uppercase italic mb-8">
                  Informasi <span className="text-primary">Kontak</span>
                </h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-none skew-x-[-10deg]">
                      <MapPin className="w-6 h-6 skew-x-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 uppercase italic">
                        Alamat
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Kampung Sukarasa, Arjasari, Kab. Bandung
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-none skew-x-[-10deg]">
                      <Mail className="w-6 h-6 skew-x-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 uppercase italic">
                        Email
                      </h3>
                      <a
                        href="mailto:info@pusamada.id"
                        className="text-lg font-medium hover:text-primary transition-colors block mb-1"
                      >
                        info@pusamada.id
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Untuk pertanyaan umum dan kerjasama
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-none skew-x-[-10deg]">
                      <Phone className="w-6 h-6 skew-x-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 uppercase italic">
                        Telepon / WhatsApp
                      </h3>
                      <a
                        href="tel:+6281234567890"
                        className="text-lg font-medium hover:text-primary transition-colors block mb-1"
                      >
                        (+62) 823-4393-6639
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Senin - Sabtu, 08.00 - 17.00 WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-bold text-xl mb-6 uppercase italic flex items-center gap-4">
                  Ikuti Kami
                  <span className="h-0.5 flex-1 bg-border"></span>
                </h3>
                <div className="flex gap-4">
                  {[Instagram, Facebook, Youtube].map((Icon, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 rounded-none skew-x-[-10deg]"
                    >
                      <Icon className="w-5 h-5 skew-x-10" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-card border-2 border-border p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] pointer-events-none -z-10 transition-transform group-hover:scale-150 duration-700" />

              <h2 className="text-3xl font-black uppercase italic mb-2">
                Kirim <span className="text-primary">Pesan</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Silakan isi formulir di bawah ini, tim kami akan segera membalas
                pesan Anda.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Nama Lengkap
                    </label>
                    <Input
                      id="name"
                      placeholder="Nama Anda"
                      className="bg-background h-12 rounded-none border-2 border-zinc-800 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="bg-background h-12 rounded-none border-2 border-zinc-800 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Subjek
                  </label>
                  <Input
                    id="subject"
                    placeholder="Perihal pesan Anda"
                    className="bg-background h-12 rounded-none border-2 border-zinc-800 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    className="bg-background min-h-[150px] resize-none rounded-none border-2 border-zinc-800 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-base font-bold uppercase tracking-widest rounded-none skew-x-[-10deg] shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <span className="skew-x-10 flex items-center justify-center gap-2">
                    Kirim Pesan <Send className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="w-full h-[500px] bg-zinc-950 relative border-y-4 border-primary">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311709999999!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1707465600000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Kami"
          className="grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100"
        ></iframe>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-950/90 backdrop-blur-md px-8 py-6 border-2 border-primary max-w-sm w-full mx-4 md:mx-0 shadow-2xl skew-x-[-10deg]">
          <div className="flex items-center gap-5 skew-x-10">
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-white shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-white uppercase italic text-lg">
                Lokasi Latihan
              </p>
              <p className="text-sm text-zinc-400 mb-2">
                Kabupaten Bandung, Jawa Barat
              </p>
              <a
                href="#"
                className="text-white text-xs font-bold uppercase tracking-widest hover:underline decoration-primary underline-offset-4"
              >
                Buka di Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KontakPage;
