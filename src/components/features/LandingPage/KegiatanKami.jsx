import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const activities = [
  {
    title: "Latihan Rutin",
    description:
      "Pembinaan fisik dan mental secara berkala untuk membentuk karakter pendekar.",
    category: "Utama",
    image: "/pusamada-logo.png", // Placeholder
  },
  {
    title: "Ujian Kenaikan Tingkat",
    description: "Evaluasi jenjang kemampuan.",
    category: "Evaluasi",
    image: "/pusamada-logo.png",
  },
  {
    title: "Kejuaraan Silat",
    description: "Meraih prestasi nasional.",
    category: "Prestasi",
    image: "/pusamada-logo.png",
  },
  {
    title: "Bakti Sosial",
    description: "Pengabdian masyarakat.",
    category: "Sosial",
    image: "/pusamada-logo.png",
  },
  {
    title: "Pentas Seni",
    description: "Pelestarian budaya.",
    category: "Budaya",
    image: "/pusamada-logo.png",
  },
];

const KegiatanKami = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 ">
        <Image
          src="/bg-1.webp"
          alt="Martial Arts Background"
          fill
          className="object-cover object-center opacity-50 dark:opacity-5 scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Header - Aligned with Landing Page Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
              <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
                Kegiatan Kami
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground text-balance uppercase italic leading-none">
              Agenda & <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600 relative inline-block pr-2">
                Aktivitas
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00026 6.99996C18.4476 3.84534 56.6669 -1.66668 95.8336 2.49997C144.792 7.70828 206 5.5 206 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-xl font-medium">
              Berbagai kegiatan positif untuk membangun generasi muda yang
              tangguh, berprestasi, dan berakhlak mulia.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              asChild
              variant="default"
              className="group rounded-none skew-x-[-10deg] px-8 h-12 text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 border-foreground bg-background text-foreground hover:bg-muted"
            >
              <Link href="/events">
                <span className="skew-x-10 flex items-center gap-2">
                  LIHAT SEMUA{" "}
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {activities.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden relative group h-[400px] bg-card hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-primary/20 backdrop-blur flex items-center justify-center text-primary border border-primary">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute inset-0 top-1/2 bg-linear-to-t from-black/90 to-transparent z-10" />

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-8 bg-muted/5 group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                      {item.category}
                    </p>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-primary transition-colors uppercase italic">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 rounded-none border-2 border-foreground bg-background hover:bg-primary hover:text-white hover:border-primary transition-colors" />
            <CarouselNext className="static translate-y-0 rounded-none border-2 border-foreground bg-background hover:bg-primary hover:text-white hover:border-primary transition-colors" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default KegiatanKami;
