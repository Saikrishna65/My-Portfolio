import React, { useEffect, useState } from "react";
import SectionFollower from "./SectionFollower";
import { useTranslation } from "react-i18next";

const skills = [
  {
    key: "javascript",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    key: "html",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    key: "css",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    key: "tailwind",
    image: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg",
  },
  {
    key: "react",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    key: "router",
    image: "https://www.svgrepo.com/show/354262/react-router.svg",
  },
  {
    key: "responsive",
    image:
      "https://static.vecteezy.com/system/resources/previews/024/407/598/non_2x/responsive-design-outline-icon-design-illustration-seo-and-web-symbol-on-white-background-eps-10-file-vector.jpg",
  },
  {
    key: "gsap",
    image:
      "https://images.seeklogo.com/logo-png/44/1/greensock-gsap-icon-logo-png_seeklogo-448110.png",
  },
  {
    key: "typescript",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  { key: "node", image: "https://icon.icepanel.io/Technology/svg/Node.js.svg" },
  {
    key: "express",
    image:
      "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=FFFFFF",
  },
  {
    key: "mongodb",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    key: "rest",
    image:
      "https://img.icons8.com/external-flat-juicy-fish/60/external-api-coding-and-development-flat-flat-juicy-fish.png",
  },
  {
    key: "socketio",
    image:
      "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c13320392397522bb5c39454d240ebf0/socket-io.png",
  },
  {
    key: "git",
    image:
      "https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=FFFFFF",
  },
  {
    key: "postman",
    image: "https://icon.icepanel.io/Technology/svg/Postman.svg",
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
    <div className="h-[120vh] lg:h-screen bg-black text-white">
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
