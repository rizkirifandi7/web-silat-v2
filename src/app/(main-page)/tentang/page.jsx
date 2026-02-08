import React from "react";
import Image from "next/image";
import { CheckCircle2, Shield, Target, Award } from "lucide-react";

const TentangPage = () => {
  return (
    <main className="bg-background min-h-screen">
      {/* 1. Page Header */}
      <section className="relative py-32 overflow-hidden bg-background flex items-center justify-center min-h-[50vh]">
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
              Tentang Kami
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Mengenal <span className="text-primary">PUSAMADA</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Menelusuri jejak sejarah, meresapi nilai-nilai luhur, dan memahami
            visi misi Pusaka Mande Muda Indonesia.
          </p>
        </div>
      </section>

      {/* 2. Sejarah (History) */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-10 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">
                  Sejarah Kami
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-foreground uppercase italic mb-8 leading-none">
                Perjalanan <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600">
                  Melestarikan Budaya
                </span>
              </h2>
              <div className="relative aspect-3/4 rounded-none -skew-x-3 border-4 border-white shadow-2xl overflow-hidden bg-muted group">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="/bg-abouts.webp"
                  alt="Sejarah Pusamada"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-bold uppercase tracking-widest text-sm">
                    Sejak 19XX
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="leading-relaxed text-muted-foreground mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3">
                Pusaka Mande Muda Indonesia (PUSAMADA) didirikan dengan semangat
                untuk melestarikan dan mengembangkan seni bela diri Pencak
                Silat, warisan leluhur bangsa Indonesia. Perjalanan kami dimulai
                dari keinginan luhur untuk tidak hanya mengajarkan teknik bela
                diri, tetapi juga menanamkan nilai-nilai budi pekerti,
                kedisiplinan, dan cinta tanah air kepada generasi muda.
              </p>
              <p className="leading-relaxed text-muted-foreground mb-6">
                Pada awal pembentukannya, PUSAMADA menghadapi berbagai
                tantangan. Namun, berkat ketekunan para pendiri dan dukungan
                masyarakat, perguruan ini tumbuh berkembang. Kami percaya bahwa
                Pencak Silat bukan sekadar olah tubuh, melainkan olah rasa dan
                olah jiwa. Setiap gerakan mengandung filosofi yang mendalam
                tentang keseimbangan hidup, penghormatan kepada sesama, dan
                pendekatan diri kepada Sang Pencipta.
              </p>
              <p className="leading-relaxed text-muted-foreground mb-6">
                Seiring berjalannya waktu, PUSAMADA telah melahirkan banyak
                pesilat berprestasi yang mengharumkan nama perguruan di berbagai
                kejuaraan, baik tingkat lokal, nasional, maupun internasional.
                Lebih dari itu, kami bangga telah menjadi rumah bagi ribuan
                anggota yang tumbuh menjadi pribadi yang tangguh, berkarakter,
                dan bermanfaat bagi masyarakat.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 italic text-foreground font-medium">
                &quot;Kini, PUSAMADA terus berinovasi tanpa meninggalkan akar
                tradisi. Kami membuka diri terhadap perkembangan zaman,
                mengadopsi metode pelatihan modern, namun tetap memegang teguh
                pakem dan filosofi asli Mande Muda.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pendiri (Founders) */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden text-center">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              Para Pendiri
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">
              Tokoh Dibalik <span className="text-primary">PUSAMADA</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Perjuangan dan dedikasi mereka menjadi pondasi kokoh nan abadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative">
                <div className="relative aspect-3/4 -skew-x-3 border-2 border-zinc-800 bg-zinc-900 overflow-hidden mb-6 transition-all duration-300 group-hover:border-primary group-hover:shadow-[8px_8px_0px_0px_var(--color-primary)]">
                  {/* Placeholder for Founder Image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                    <Award className="w-16 h-16 text-zinc-700 group-hover:text-primary transition-colors" />
                  </div>
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">
                      &quot;Dedikasi tanpa batas untuk seni bela diri.&quot;
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-black text-xl text-white uppercase italic">
                    Nama Pendiri {item}
                  </h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">
                    Gelar / Posisi
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Filosofi Lambang */}
      <section className="py-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic mb-6">
              Makna & <span className="text-primary">Filosofi</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Setiap goresan memiliki arti, setiap warna memiliki jiwa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative">
            {/* Connecting Lines (Desktop only decoration) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10 bg-linear-to-r from-transparent via-primary/20 to-transparent" />

            {/* Left Column Meanings */}
            <div className="space-y-12">
              <div className="flex flex-col md:items-end md:text-right gap-3 group">
                <div className="p-3 bg-red-500/10 text-red-600 rounded-none skew-x-[-10deg] w-fit border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <Shield className="w-6 h-6 skew-x-10" />
                </div>
                <div>
                  <h3 className="font-black text-xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 uppercase">
                    Warna Merah
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Keberanian, semangat juang, dan darah patriot.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:items-end md:text-right gap-3 group">
                <div className="p-3 bg-yellow-500/10 text-yellow-600 rounded-none skew-x-[-10deg] w-fit border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <Award className="w-6 h-6 skew-x-10" />
                </div>
                <div>
                  <h3 className="font-black text-xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 uppercase">
                    Warna Kuning
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Keluhuran budi, kejayaan, dan kebijaksanaan.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Logo */}
            <div className="relative flex justify-center py-10 md:py-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 animate-in zoom-in-50 duration-700">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
                <Image
                  src="/pusamada-logo.png"
                  alt="Lambang PUSAMADA"
                  width={320}
                  height={320}
                  className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column Meanings */}
            <div className="space-y-12">
              <div className="flex flex-col items-start text-left gap-3 group">
                <div className="p-3 bg-green-500/10 text-green-600 rounded-none skew-x-[-10deg] w-fit border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Target className="w-6 h-6 skew-x-10" />
                </div>
                <div>
                  <h3 className="font-black text-xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 uppercase">
                    Lingkaran
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Persatuan, kesatuan, dan persaudaraan abadi.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start text-left gap-3 group">
                <div className="p-3 bg-blue-500/10 text-blue-600 rounded-none skew-x-[-10deg] w-fit border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-6 h-6 skew-x-10" />
                </div>
                <div>
                  <h3 className="font-black text-xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 uppercase">
                    Warna Putih
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Kesucian hati, niat tulus, dan kebersihan jiwa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visi & Misi Refined */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Visi */}
            <div className="space-y-8">
              <div className="inline-block relative">
                <span className="relative z-10 text-primary font-bold tracking-widest uppercase text-sm">
                  Visi Kami
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary skew-x-[-10deg]" />
              </div>
              <h2 className="text-4xl font-black text-white italic uppercase leading-tight">
                &quot;Menjadi Pusat Keunggulan Pencak Silat yang Berkarakter dan
                Mendunia.&quot;
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Kami bercita-cita untuk tidak hanya mencetak juara di
                gelanggang, tetapi juga melahirkan pemimpin-pemimpin masa depan
                yang memiliki integritas dan kecintaan terhadap budaya.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-zinc-950 p-8 md:p-10 border-l-4 border-primary shadow-2xl">
              <div className="inline-block relative mb-8">
                <span className="relative z-10 text-primary font-bold tracking-widest uppercase text-sm">
                  Misi Kami
                </span>
              </div>
              <ul className="space-y-6">
                {[
                  "Melestarikan dan mengembangkan seni budaya Pencak Silat Mande Muda.",
                  "Membangun karakter generasi muda yang disiplin, jujur, dan bertanggung jawab.",
                  "Meningkatkan prestasi olahraga Pencak Silat di tingkat nasional dan internasional.",
                  "Mempererat tali persaudaraan antar pesilat dan perguruan.",
                  "Menyebarkan nilai-nilai luhur Pencak Silat ke seluruh lapisan masyarakat.",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 items-start group">
                    <div className="shrink-0 mt-1 w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="text-[10px] font-bold">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300 group-hover:text-white transition-colors">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TentangPage;
