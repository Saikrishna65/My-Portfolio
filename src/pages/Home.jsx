import React, { useEffect, useState, Suspense, lazy } from "react";
import { useMediaQuery } from "react-responsive";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import SideBar from "../components/SideBar";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Loader from "../components/Loader";
import Experience from "../components/Experience";
import Certificates from "../components/Certifications";
import Marquee from "../components/Marquee";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

// Lazy load both components
const Projects = lazy(() => import("../components/Projects"));
const ProjectsMobile = lazy(() => import("../components/ProjectsMobile"));

const Home = () => {
  const { t } = useTranslation();
  const [loaderDone, setLoaderDone] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const techPhrases = Object.values(
    t("marquee.tech", { returnObjects: true })
  ).map((text) => ({ text }));
  const rolePhrases = Object.values(
    t("marquee.roles", { returnObjects: true })
  ).map((text) => ({ text }));
  const contactTexts = Object.values(
    t("marquee.contact", { returnObjects: true })
  );

  const contactPhrases = [
    { text: contactTexts[0], icon: <Mail /> },
    { text: contactTexts[1], icon: <Phone /> },
    { text: contactTexts[2], icon: <Mail /> },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderDone(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <SideBar />
      <HeroSection animationStart={loaderDone} />

      <div className="relative h-[150px] bg-black overflow-x-hidden">
        <div className="absolute w-full top-1/2 -left-0 -translate-y-1/2 z-10">
          <Marquee
            phrases={techPhrases}
            containerClass="bg-[#00CAFF] h-16 rotate-6 md:rotate-3"
            textClass="text-2xl mx-6 font-semibold font-outfit"
          />
        </div>
        <div className="absolute w-full top-1/2 -left-0 -translate-y-1/2">
          <Marquee containerClass="bg-white h-16" />
        </div>
      </div>

      <About />
      <Skills />
      <Experience />
      <Certificates />

      <Suspense fallback={<div>Loading Projects...</div>}>
        {isMobile ? <ProjectsMobile /> : <Projects />}
      </Suspense>

      <div className="bg-black h-[250px] md:h-[500px] pt-10 md:pt-20 overflow-x-hidden">
        <Marquee
          phrases={rolePhrases}
          containerClass="h-30 md:h-56 bg-[#CC1F50] -rotate-4"
          textClass="text-[8rem] md:text-[12rem] px-14 text-white tracking-widest font-spacegrotesk"
        />

        <Marquee
          phrases={contactPhrases}
          containerClass="md:h-30 bg-[#9EEC5A] rotate-4"
          textClass="text-3xl md:text-[5rem] px-10 md:px-14 text-black tracking-widest font-outfit"
        />
      </div>

      <Contact />

      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
    </div>
  );
};

export default Home;
