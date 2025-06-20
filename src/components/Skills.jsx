import React, { useEffect, useState } from "react";
import SectionFollower from "./SectionFollower";
import { useTranslation } from "react-i18next";

const skills = [
  {
    key: "javascript",
    image: "./images/javaScript.webp",
  },
  {
    key: "html",
    image: "./images/HTML.webp",
  },
  {
    key: "css",
    image: "./images/css.webp",
  },
  {
    key: "tailwind",
    image: "./images/tailwind.webp",
  },
  {
    key: "react",
    image: "./images/react.webp",
  },
  {
    key: "router",
    image: "./images/router.webp",
  },
  {
    key: "responsive",
    image: "./images/responsive.webp",
  },
  {
    key: "gsap",
    image: "./images/gsap.webp",
  },
  {
    key: "typescript",
    image: "./images/typeScript.webp",
  },
  { key: "node", image: "./images/node.webp" },
  {
    key: "express",
    image: "./images/express.webp",
  },
  {
    key: "mongodb",
    image: "./images/mongoDB.webp",
  },
  {
    key: "rest",
    image: "./images/restAPI.webp",
  },
  {
    key: "socketio",
    image: "./images/socket.webp",
  },
  {
    key: "git",
    image: "./images/github.webp",
  },
  {
    key: "postman",
    image: "./images/postman.webp",
  },
];

const Skills = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerCol = isMobile ? 4 : 8;

  return (
    <div id="skills" className="h-[120vh] lg:h-screen bg-black text-white">
      <div className="text-4xl md:text-6xl lg:text-8xl pl-5 md:pl-20 pt-10 font-spacegrotesk">
        {t("skills.heading")}
      </div>

      <div className="w-screen pt-10 md:pt-20 px-3 md:px-20 grid grid-rows-8 md:grid-rows-4 grid-flow-col auto-cols-fr gap-y-4 gap-x-8">
        {skills.map((skill, index) => (
          <SectionFollower key={index} imageUrl={skill.image}>
            <div
              key={index}
              className="w-full h-full flex flex-col items-center justify-center text-center cursor-pointer"
            >
              {(isMobile ? index === 0 || index === 8 : index % 4 === 0) && (
                <div className="w-full h-px bg-white mb-2" />
              )}

              <div className="text-xl md:text-2xl font-medium py-2">
                {t(`skills.${skill.key}`)}
              </div>

              <div className="w-full h-px bg-white mt-2" />
            </div>
          </SectionFollower>
        ))}
      </div>
    </div>
  );
};

export default Skills;
