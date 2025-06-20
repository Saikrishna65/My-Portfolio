import React, { useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutTextEffect = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const lines = t("aboutTextEffect.lines", { returnObjects: true });

  const defaultColor = "#FFFFFF";
  const highlightColor = "#FF0050";
  const neighborColor = "#FF5577";

  const defaultScale = 1;
  const maxScale = 2;
  const neighborScale = 1.5;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const allChars = gsap.utils.toArray(".char");

      gsap.set(allChars, {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 1,
        y: 0,
      });

      gsap.to(allChars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.out",
        stagger: {
          each: 0.02,
          from: "start",
        },
      });

      allChars.forEach((char) => {
        const wordDiv = char.parentNode;
        const siblings = Array.from(wordDiv.querySelectorAll(".char"));

        char.addEventListener("mouseenter", () => {
          const idx = siblings.indexOf(char);
          siblings.forEach((s, i) => {
            const isHovered = i === idx;
            const isNeighbor = Math.abs(i - idx) === 1;

            gsap.to(s, {
              scaleY: isHovered
                ? maxScale
                : isNeighbor
                ? neighborScale
                : defaultScale,
              color: isHovered
                ? highlightColor
                : isNeighbor
                ? neighborColor
                : defaultColor,
              duration: 0.15,
              ease: "power2.out",
            });
          });
        });

        char.addEventListener("mouseleave", () => {
          siblings.forEach((s) => {
            gsap.to(s, {
              scaleY: defaultScale,
              color: defaultColor,
              duration: 0.15,
              ease: "power2.out",
            });
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lines]); // Re-run animation on language change

  return (
    <div
      ref={containerRef}
      className="absolute right-0 pt-10 pl-5 md:pl-0 w-full md:w-[60%] text-white overflow-hidden"
    >
      <div className="flex flex-col gap-1 md:gap-4">
        {lines.map((line, lineIndex) => (
          <div className="flex gap-1 md:gap-4 flex-wrap" key={lineIndex}>
            {line.map((word, wordIndex) => (
              <div className="flex" key={wordIndex}>
                {word.split("").map((char, i) => (
                  <span
                    key={i}
                    className="char cursor-pointer font-bold uppercase text-[4vw] md:text-[2vw] origin-bottom inline-block font-notosans"
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTextEffect;
