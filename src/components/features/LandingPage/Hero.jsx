import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, ScanLine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20 lg:pt-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/bg-hero.webp"
          alt="Martial Arts Background"
          fill
          className="object-cover object-center opacity-30 dark:opacity-20 -rotate-2"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left space-y-6 order-2 lg:order-1 relative">
            {/* Brush Stroke Title Background */}
            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="space-y-2">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
                <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
                  Pencak Silat
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.2] drop-shadow-sm uppercase italic">
                Pusaka <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600 relative inline-block pr-2">
                  Mande Muda <br />
                  {/* Underline Brush */}
                  <svg
                    className="absolute w-full h-4 -bottom-2 left-0 text-primary opacity-80"
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
                Indonesia
              </h1>

              <p className="max-w-xl text-lg sm:text-2xl text-muted-foreground font-serif italic pt-4 leading-relaxed relative">
                <span className="text-primary text-4xl absolute -top-4 -left-4 opacity-20">
                  &quot;
                </span>
                Élmu Luhung Jembar Kabisa, Budi Suci Gede Bakti.
                <span className="text-primary text-4xl absolute -bottom-4 right-0 opacity-20">
                  &quot;
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-none skew-x-[-10deg] px-8 h-14 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/kontak">
                  <span className="skew-x-10 flex items-center gap-2">
                    GABUNG SEKARANG <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none skew-x-[-10deg] px-8 h-14 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/10 transition-all"
              >
                <Link href="/verify">
                  <span className="skew-x-10 flex items-center gap-2">
                    CEK KEANGGOTAAN <ScanLine className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center">
            {/* Dynamic Circular 'Brush' effect behind logo */}
            <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
              {/* Rotating Ring Text or Brush Circle */}
              <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 border border-primary/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

              {/* Paint Splash SVG Background */}
              <div className="absolute inset-0 text-primary/10 scale-150 animate-pulse">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M41.5,-59.5C52.1,-48.7,58.3,-34.8,63.7,-20.2C69.1,-5.6,73.6,9.8,70.1,23.5C66.5,37.2,54.8,49.2,42,57.1C29.2,65,15.3,68.8,1.1,67.3C-13.1,65.8,-27.6,59,-40.1,50.7C-52.6,42.4,-63.1,32.6,-68.2,20C-73.4,7.4,-73.2,-8,-66.6,-21.2C-60,-34.4,-47,-45.4,-34.5,-55.1C-22,-64.8,-10,-73.2,2.8,-77.1C15.7,-80.9,31.3,-80.2,46.2,-74.6L41.5,-59.5Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>

              <div className="relative w-full h-full p-12 lg:p-16">
                <Image
                  src="/pusamada-logo.png"
                  alt="Hero Visual"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
