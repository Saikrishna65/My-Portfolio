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

// Lazy load both components
const Projects = lazy(() => import("../components/Projects"));
const ProjectsMobile = lazy(() => import("../components/ProjectsMobile"));

const Home = () => {
  const [loaderDone, setLoaderDone] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      <About />
      <Skills />
      <Experience />
      <Certificates />

      <Suspense fallback={<div>Loading Projects...</div>}>
        {isMobile ? <ProjectsMobile /> : <Projects />}
      </Suspense>

      <Contact />

      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
    </div>
  );
};

export default Home;
