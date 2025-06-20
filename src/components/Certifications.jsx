import React from "react";
import { useTranslation } from "react-i18next";

const Certificates = () => {
  const { t } = useTranslation();
  const certificates = t("certificates.items", { returnObjects: true });

  return (
    <section
      id="certificates"
      className="bg-black text-white py-16 px-4 md:px-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-8xl font-spacegrotesk text-center mb-14">
          {t("certificates.title")}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl border border-white/10 bg-zinc-900 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold font-montserrat mb-1 group-hover:underline">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-400">{cert.platform}</p>
              <p className="text-xs text-gray-500">{cert.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
