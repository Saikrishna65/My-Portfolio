import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import LazyVideo from "./LazyVideo";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Video overlay refs
  const videoOverlay1Ref = useRef(null); // Chat App
  const videoOverlay2Ref = useRef(null); // Food Order

  // Text overlay refs
  const textOverlay1Ref = useRef(null); // Chat App
  const textOverlay2Ref = useRef(null); // Food Order

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    });

    // Animate Chat App overlays (video + text)
    tl.to(
      [videoOverlay1Ref.current, textOverlay1Ref.current],
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power2.inOut",
      },
      "<"
    );

    // Animate Food Order overlays (video + text)
    tl.to(
      [videoOverlay2Ref.current, textOverlay2Ref.current],
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power2.inOut",
      },
      ">"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="text-4xl md:text-8xl pl-7 md:pl-20 py-10 font-spacegrotesk">
        {t("projects.title")}
      </div>

      <div
        ref={sectionRef}
        className="flex flex-col gap-1 items-center w-full h-[100vh] relative"
      >
        {/* Video Layer Stack */}
        <div className="w-full h-[40%] relative">
          <LazyVideo
            src="./videos/Bmw-Video.mp4"
            className="w-full h-full rounded-4xl overflow-hidden object-cover absolute top-0 left-0 z-10"
          />
          <LazyVideo
            ref={videoOverlay2Ref}
            src="./videos/Food-Order-Video.mp4"
            className="w-full h-full rounded-4xl overflow-hidden object-cover absolute top-0 left-0 z-20 [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)]"
          />
          <LazyVideo
            ref={videoOverlay1Ref}
            src="./videos/Chat-App-Video.mp4"
            poster="/Chat-App.jpg"
            className="w-full h-full rounded-4xl overflow-hidden object-cover absolute top-0 left-0 z-30 [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)]"
          />
        </div>

        {/* Text Overlay Layer Stack */}
        <div className="w-full h-[60%] relative text-black rounded-4xl">
          {/* BMW Text */}
          <div className="w-full h-full bg-[#f5f5f5] p-3 flex flex-col z-10 absolute top-0 left-0 rounded-4xl">
            <h3 className="text-2xl font-extrabold text-center">
              {t("projects.bmwSite.title")}
            </h3>
            <p className="text-lg text-gray-700 text-center">
              {t("projects.bmwSite.description")}
            </p>
            <ul className="list-inside text-lg">
              {Array.from({ length: 5 }, (_, i) =>
                i !== 4 ? (
                  <li key={i} className="flex items-start">
                    <span className="mr-1 text-green-500">✔️</span>
                    <span>{t(`projects.bmwSite.features.${i}`)}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Food Order Text */}
          <div
            ref={textOverlay2Ref}
            className="w-full h-full bg-[#f5f5f5] p-3 flex flex-col z-20 absolute top-0 left-0 rounded-4xl [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)]"
          >
            <h3 className="text-2xl font-extrabold text-center">
              {t("projects.foodOrder.title")}
            </h3>
            <p className="text-lg text-gray-700 text-center">
              {t("projects.foodOrder.description")}
            </p>
            <ul className="list-inside text-lg">
              {Array.from({ length: 6 }, (_, i) =>
                i !== 4 ? (
                  <li key={i} className="flex items-start">
                    <span className="mr-1 text-green-500">✔️</span>
                    <span>{t(`projects.foodOrder.features.${i}`)}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Chat App Text */}
          <div
            ref={textOverlay1Ref}
            className="w-full h-full bg-[#f5f5f5] p-3 flex flex-col z-30 absolute top-0 left-0 rounded-4xl [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)]"
          >
            <h3 className="text-2xl font-extrabold text-center">
              {t("projects.chatApp.title")}
            </h3>
            <p className="text-lg text-gray-700 text-center">
              {t("projects.chatApp.description")}
            </p>
            <ul className="list-inside text-lg">
              {Array.from({ length: 7 }, (_, i) =>
                i !== 4 ? (
                  <li key={i} className="flex items-start">
                    <span className="mr-1 text-green-500">✔️</span>
                    <span>{t(`projects.chatApp.features.${i}`)}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
