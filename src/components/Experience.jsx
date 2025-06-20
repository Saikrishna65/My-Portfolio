import React from "react";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation();
  const experiences = t("experience.entries", { returnObjects: true });

  return (
    <section
      id="experience"
      className="bg-black text-white py-16 px-4 flex justify-center"
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-4xl md:text-8xl font-spacegrotesk text-center mb-14">
          {t("experience.title")}
        </h2>

        <div className="relative border-l-2 border-white/20 pl-8 space-y-14">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[0.5rem] top-2 w-3.5 h-3.5 bg-white rounded-full"></div>

              <div className="ml-6 space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold font-montserrat">
                  {exp.title}
                  <span className="text-gray-400 font-normal">
                    {" "}
                    @ {exp.company}
                  </span>
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  {exp.duration}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-300 font-space text-sm md:text-[16px] leading-relaxed">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
