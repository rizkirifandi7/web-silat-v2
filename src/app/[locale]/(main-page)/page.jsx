import React from "react";
import Hero from "@/components/features/LandingPage/Hero";
import About from "@/components/features/LandingPage/About";
import KegiatanKami from "@/components/features/LandingPage/KegiatanKami";
import Kontak from "@/components/features/LandingPage/Kontak";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <KegiatanKami />
      <Kontak />
    </div>
  );
};

export default Home;
