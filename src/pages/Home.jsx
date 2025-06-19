import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import SideBar from "../components/SideBar";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Loader from "../components/Loader";

const Home = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  // Automatically mark loader as done after 4.5 seconds
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
      <Projects />
      <Contact />

      {!loaderDone && <Loader onComplete={() => loaderDone(true)} />}
    </div>
  );
};

export default Home;
