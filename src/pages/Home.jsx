import React from "react";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import SideBar from "../components/SideBar";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <div>
      <SideBar />
      <HeroSection />
      <About />
      <Skills />
      <Projects />
    </div>
  );
};

export default Home;
