import React from "react";
import { useTranslation } from "react-i18next";

const ResumeButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {/* View Resume Button */}
      <a
        href="/Sai_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        {t("resume.view")}
      </a>

      {/* Download Resume Button */}
      <a
        href="/Sai_Resume.pdf"
        download
        className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
      >
        {t("resume.download")}
      </a>
    </div>
  );
};

export default ResumeButtons;
