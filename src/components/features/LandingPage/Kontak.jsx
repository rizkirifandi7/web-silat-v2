import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactLanding = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Dynamic Background */}
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/bg-about.webp"
          alt="Martial Arts Background"
          fill
          className="object-cover object-center opacity-50 dark:opacity-5 scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
              <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
                Bergabung Bersama Kami
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none">
              Mulai Perjalanan <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600 relative inline-block pr-2">
                Menjadi Pendekar
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

            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Siap untuk melatih fisik, mental, dan karakter Anda? Hubungi kami
              untuk informasi pendaftaran dan jadwal latihan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                {
                  icon: MapPin,
                  title: "Lokasi Latihan",
                  desc: "Kampung Sukarasa, Arjasari, Kab. Bandung",
                },
                { icon: Mail, title: "Email", desc: "info@pusamada.id" },
                { icon: Phone, title: "WhatsApp", desc: "+62 823-4393-6639" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 group rounded"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button
                asChild
                size="lg"
                className="rounded-none skew-x-[-10deg] px-10 h-14 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/kontak">
                  <span className="skew-x-10 flex items-center gap-2">
                    HUBUNGI KAMI <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Map / Visual Side */}
          <div className="relative h-[400px] lg:h-[500px] w-full border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-muted overflow-hidden group">
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors" />

            {/* Embed Map Iframe (Placeholder) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311705234976!3d-6.903444341687889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1707012345678"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            />

            <div className="absolute bottom-0 right-0 bg-foreground text-background p-4 font-bold text-xs uppercase tracking-widest z-20">
              Markas Besar PUSAMADA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLanding;
