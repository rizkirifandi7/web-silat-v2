import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/bg-2.webp"
          alt="Martial Arts Background"
          fill
          className="object-cover object-center opacity-20 dark:opacity-5"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-transparent" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="flex flex-col gap-8 order-2 lg:order-1 animate-in slide-in-from-left-8 fade-in duration-700 delay-200 relative">
            {/* Brush Stroke Behind Title */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="space-y-4">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
                <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
                  Tentang Kami
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground text-balance uppercase italic leading-none">
                Melestarikan Budaya, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600 relative inline-block pr-2">
                  Membangun Karakter
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
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-balance font-medium">
              <p>
                <strong className="text-foreground">
                  Pusaka Mande Muda Indonesia (PUSAMADA)
                </strong>{" "}
                hadir sebagai wadah pelestarian seni bela diri Pencak Silat,
                warisan leluhur yang sarat akan nilai filosofis dan budi
                pekerti.
              </p>
              <p>
                Kami berkomitmen untuk tidak hanya mencetak pesilat yang tangguh
                secara fisik, tetapi juga bermental baja, berbudi pekerti luhur,
                dan menjunjung tinggi nilai-nilai kehormatan serta persaudaraan.
              </p>
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-none skew-x-[-10deg] px-8 h-12 text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/tentang">
                  <span className="skew-x-10 flex items-center gap-2">
                    PELAJARI SEJARAH KAMI <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[500px] w-full animate-in slide-in-from-right-8 fade-in duration-700 delay-300 group">
            {/* Ink Splash SVG Background */}
            <div className="absolute inset-0 text-primary/10 scale-125 group-hover:scale-135 transition-transform duration-700">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full fill-current"
              >
                <path
                  d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,71.3,34.5C60.5,46.1,50.3,55.7,38.8,63.1C27.3,70.5,14.5,75.7,0.9,74.1C-12.7,72.5,-27.2,64.1,-39.8,55.3C-52.4,46.5,-63.1,37.3,-71.4,25.8C-79.7,14.3,-85.6,0.5,-83.4,-12.3C-81.2,-25.1,-70.9,-36.9,-59.7,-46.3C-48.5,-55.7,-36.4,-62.7,-23.7,-68.4C-11,-74.1,2.3,-78.5,16.2,-79.5C30.1,-80.5,44.7,-78.1,44.7,-76.4Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 group-hover:rotate-3 group-hover:scale-105">
                <Image
                  src="/pusamada-logo.png"
                  alt="Filosofi Pusamada"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Overlay Quotes or Elements */}
            <div className="absolute bottom-10 right-10 bg-card border border-border p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xs transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <p className="font-serif italic text-sm text-foreground">
                &quot;Pencak Silat bukan hanya tentang pukulan, tapi tentang
                kendali diri.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
