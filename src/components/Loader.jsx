import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const textRef = useRef([]);
  const topBlocksRef = useRef([]);
  const bottomBlocksRef = useRef([]);
  const [showLoader, setShowLoader] = useState(true); // Visibility control

  const charPool = [
    "海",
    "雲",
    "星",
    "夜",
    "雨",
    "雪",
    "光",
    "花",
    "桜",
    "森",
    "한",
    "글",
    "세",
    "종",
    "문",
    "자",
    "س",
    "ل",
    "م",
    "ح",
    "ب",
    "क",
    "ख",
    "ग",
    "घ",
    "च",
    "छ",
    "Д",
    "Ж",
    "И",
    "Й",
    "Л",
    "Ф",
    "Æ",
    "Ø",
    "ß",
    "Ç",
    "Ñ",
    "Å",
  ];

  const getRandomChar = () =>
    charPool[Math.floor(Math.random() * charPool.length)];

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    const timeline = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        document.body.style.overflow = "auto";
        setShowLoader(false);
      },
    });

    const text = "LOADING";

    text.split("").forEach((char, i) => {
      const el = textRef.current[i];
      if (!el) return;

      const timeOffset = i * 0.3;

      timeline.call(
        () => {
          el.textContent = getRandomChar();
        },
        null,
        timeOffset
      );

      timeline.call(
        () => {
          el.textContent = getRandomChar();
        },
        null,
        timeOffset + 0.07
      );

      timeline.call(
        () => {
          el.textContent = char;
        },
        null,
        timeOffset + 0.14
      );
    });

    timeline.to(
      textRef.current,
      {
        scaleY: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "<"
    );

    timeline.to(topBlocksRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      stagger: { each: 0.1, from: "start" },
      ease: "power4.inOut",
    });

    timeline.to(
      bottomBlocksRef.current,
      {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1,
        stagger: { each: 0.1, from: "start" },
        ease: "power4.inOut",
      },
      "<"
    );
  }, []);

  if (!showLoader) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[99999]">
        <h1 className="text-6xl font-bold text-black flex gap-1">
          {"LOADING".split("").map((_, i) => (
            <span
              key={i}
              ref={(el) => (textRef.current[i] = el)}
              className="inline-block origin-center"
            ></span>
          ))}
        </h1>
      </div>

      <div className="fixed top-0 h-screen w-screen pointer-events-none z-[9999]">
        <div className="w-screen h-1/2 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={`top-${i}`}
              ref={(el) => (topBlocksRef.current[i] = el)}
              className="flex-1 bg-white origin-top scale-y-100"
            />
          ))}
        </div>
        <div className="w-screen h-1/2 flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              ref={(el) => (bottomBlocksRef.current[i] = el)}
              className="flex-1 bg-white origin-bottom scale-y-100"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Loader;
