import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ResumeButtons from "./ResumeModel";

const HeroSection = ({ animationStart }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const englishName = t("hero.intro2", { lng: "en" });
  const engChars = englishName.split("");
  const descText = t("hero.desc");
  const descChars = descText.split("");

  const charPool = [
    // Japanese Kanji
    "海",
    "雲",
    "星",
    "夜",
    "雨",
    "雪",
    "光",
    "花",
    "桜",
    // Korean Hangul
    "한",
    "글",
    "세",
    "종",
    "문",
    "자",
    // Arabic
    "س",
    "ل",
    "م",
    "ح",
    "ب",
    // Hindi (Devanagari)
    "क",
    "ख",
    "ग",
    "घ",
    "च",
    "छ",
    // Cyrillic (Russian)
    "Д",
    "Ж",
    "И",
    "Й",
    "Л",
    "Ф",
    // Extended Latin (German, French, Spanish, Nordic)
    "Æ",
    "Ø",
    "ß",
    "Ç",
    "Ñ",
    "Å",
  ];

  const letterRefs = useRef([]);
  const hasAnimated = useRef(false);
  const manualSwitch = useRef(false);

  // Track language switch
  const previousLang = useRef(currentLang);
  if (previousLang.current !== currentLang) {
    if (previousLang.current === "ja" && currentLang === "en") {
      manualSwitch.current = true;
    }
    previousLang.current = currentLang;
  }

  const shouldAnimate = currentLang === "en" && !manualSwitch.current;

  const getRandomKanji = () =>
    charPool[Math.floor(Math.random() * charPool.length)];

  useLayoutEffect(() => {
    if (!animationStart || !shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      letterRefs.current.forEach((span) => {
        if (span) span.textContent = "";
      });

      const tl = gsap.timeline();

      const kanji1Duration = 0.07;
      const kanji2Duration = 0.07;
      const finalCharDelay = 0.05;

      engChars.forEach((char, i) => {
        const span = letterRefs.current[i];
        if (!span) return;

        const timeOffset = i * 0.12;

        tl.call(
          () => {
            span.textContent = char === " " ? "\u00A0" : getRandomKanji();
          },
          null,
          timeOffset
        );

        tl.call(
          () => {
            if (char !== " ") span.textContent = getRandomKanji();
          },
          null,
          timeOffset + kanji1Duration
        );

        tl.call(
          () => {
            span.textContent = char === " " ? "\u00A0" : char;
          },
          null,
          timeOffset + kanji1Duration + kanji2Duration + finalCharDelay
        );
      });

      descChars.forEach((char, j) => {
        const idx = engChars.length + j;
        const span = letterRefs.current[idx];
        if (!span) return;

        tl.call(
          () => {
            span.textContent = char;
          },
          null,
          j * 0.03 + engChars.length * 0.12
        );
      });
    });

    return () => ctx.revert();
  }, [animationStart, currentLang, shouldAnimate]);

  return (
    <div id="home" className="relative min-h-screen bg-black text-white">
      {/* Language Toggle */}
      <div className="fixed top-8 right-24 z-10">
        <button
          onClick={() => i18n.changeLanguage("en")}
          className="text-sm px-2 py-1 mr-2 border border-white font-bold rounded cursor-pointer"
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage("ja")}
          className="text-sm px-2 py-1 border border-white font-bold rounded cursor-pointer"
        >
          日本語
        </button>
      </div>

      <div className="md:flex lg:flex">
        <div className="ml-6 lg:ml-12 pt-6 lg:pt-3">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-spacegrotesk">
            {t("hero.intro1")}
          </h1>
          <h1
            className={`text-5xl md:text-8xl lg:text-9xl font-spacegrotesk ${
              currentLang === "en"
                ? "whitespace-nowrap"
                : "whitespace-normal break-words"
            }`}
          >
            {currentLang === "en"
              ? engChars.map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => (letterRefs.current[i] = el)}
                    className="inline-block"
                  >
                    {!shouldAnimate ? (char === " " ? "\u00A0" : char) : ""}
                  </span>
                ))
              : t("hero.intro2")}
          </h1>
        </div>
        <div className="mt-2 md:mt-44 lg:mt-56 ml-30">
          <h1 className="font-spacegrotesk">{t("hero.title")}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 absolute ml-5 lg:ml-12 bottom-72 lg:bottom-12 whitespace-pre-line">
        <div>
          {currentLang === "en" ? (
            <h1 className="font-spacegrotesk">
              {descChars.map((char, j) => (
                <span
                  key={j + engChars.length}
                  ref={(el) => (letterRefs.current[engChars.length + j] = el)}
                >
                  {!shouldAnimate ? char : ""}
                </span>
              ))}
            </h1>
          ) : (
            <h1 className="font-spacegrotesk">{t("hero.desc")}</h1>
          )}
        </div>
        <div className="text-center">
          <ResumeButtons />
        </div>
      </div>

      <div className="absolute right-5 bottom-10 lg:bottom-1 flex flex-col items-end space-y-[-0.5rem]">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-spacegrotesk leading-none">
          {t("hero.role1")}
        </h1>
        <h2 className="lg:text-2xl font-spacegrotesk">{t("hero.role2")}</h2>
      </div>
    </div>
  );
};

export default HeroSection;
