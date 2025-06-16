import React from "react";
import { useTranslation } from "react-i18next";
import RotatingTextCircle from "./RotatingTextCircle";
import AboutTextEffect from "./AboutTextEffect";

const About = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        "h-screen sm:h-screen md:h-[200vh] bg-black text-white pt-20 " +
        "bg-[url('/human.webp')] bg-cover bg-top md:bg-center"
      }
    >
      <div className="relative flex flex-col space-y-1 lg:space-y-[-1.5rem] md:px-40">
        <div className="hidden lg:flex justify-between items-center">
          <div className="font-spacegrotesk -ml-30 whitespace-pre-line">
            {t("about.leftTop")}
          </div>
          <div className="font-spacegrotesk text-[8rem] text-center">
            {t("about.centerTitle")}
          </div>
          <div className="pt-10 font-spacegrotesk -mr-30 whitespace-pre-line">
            {t("about.rightTop")}
          </div>
        </div>

        <div className="block lg:hidden font-spacegrotesk text-5xl md:text-8xl text-center">
          {t("about.centerTitle")}
        </div>

        <div>
          <div className="font-spacegrotesk text-5xl md:text-8xl lg:text-[8rem] text-center lg:text-start">
            {t("about.line1")}
          </div>
          <div className="font-spacegrotesk text-5xl md:text-8xl lg:text-[8rem] text-center lg:text-end">
            {t("about.line2")}
          </div>
        </div>

        <div className="hidden lg:flex">
          <div className="font-spacegrotesk text-[8rem] text-start">
            {t("about.line3")}
          </div>
          <div className="absolute right-20 pt-20 whitespace-pre-line">
            {t("about.bottomRight")}
          </div>
        </div>

        <div className="block lg:hidden font-spacegrotesk text-5xl md:text-8xl text-center">
          {t("about.line3")}
        </div>
      </div>

      <div className="block lg:hidden pt-5 md:pt-20 pl-5 md:pl-10 font-spacegrotesk whitespace-pre-line">
        {t("about.rightTop")}
      </div>

      <div className="flex">
        <RotatingTextCircle />
        <AboutTextEffect />
      </div>
    </div>
  );
};

export default About;
