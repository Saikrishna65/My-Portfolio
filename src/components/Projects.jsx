import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const redBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const thirdBoxRef = useRef(null);
  const fourthBoxRef = useRef(null);
  const overlayRef1 = useRef(null);
  const overlayRef2 = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const redBox = redBoxRef.current;
    const greenBox = rightBoxRef.current;
    const blueBox = thirdBoxRef.current;
    const yellowBox = fourthBoxRef.current;

    // Create one timeline with a ScrollTrigger that pins the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1000", // extend end to cover all animations (adjust if needed)
        scrub: 1,
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    });

    // Step 1: Move green and blue boxes, and fade/scale red box (overlapping)
    tl.to(greenBox, {
      x: "-101%",
      duration: 1,
      scrub: 1,
      ease: "power2.out",
    })
      .to(
        overlayRef1.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        blueBox,
        {
          y: "-3.5%",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      ) // "<" starts at same time as previous tween
      .to(
        redBox,
        {
          scaleY: 0.9,
          scaleX: 0.8,
          opacity: 0,
          duration: 3,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        "<"
      ); // start with previous tweens

    // Step 2: After Step 1 finishes, move blue out, move yellow up, and fade/scale green
    tl.to(blueBox, {
      x: "-101%",
      duration: 1,
      ease: "power2.out",
    })
      .to(
        overlayRef2.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        yellowBox,
        {
          y: "-3.5%",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        greenBox,
        {
          scaleY: 0.9,
          scaleX: 0.8,
          opacity: 0,
          duration: 3,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        "<"
      );

    // Cleanup on unmount
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="text-4xl md:text-8xl pl-7 md:pl-20 py-10 font-spacegrotesk">
        {t("projects.title")}
      </div>

      {/* Sticky Section */}
      <div
        ref={sectionRef}
        className="flex gap-1 items-center w-full h-[100vh] relative"
      >
        {/* Red Box */}
        <div
          ref={redBoxRef}
          className="w-1/2 ml-2 rounded-[50px] text-black bg-[#f5f5f5] h-[95%] z-10"
        >
          <div className="w-full h-full rounded-[50px] bg-[#f5f5f5] p-8 flex flex-col">
            <div className="flex flex-col justify-center items-center my-3">
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">
                {t("projects.chatApp.title")}
              </h3>
              <p className="text-lg text-gray-700">
                {t("projects.chatApp.description")}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <ul className="list-inside space-y-4 text-lg lg:text-[20px]">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.0")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.4")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.5")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.chatApp.features.6")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Green Box */}
        <div
          ref={rightBoxRef}
          className="w-1/2 -mr-4 rounded-[50px] bg-green-500 h-[95%] z-20 absolute right-1"
        >
          <video
            src="./food-order-video.mp4"
            muted
            autoPlay
            loop
            className="w-full rounded-[50px] h-[100.1%] overflow-hidden object-cover absolute top-0 left-0"
          />
          <video
            ref={overlayRef1}
            src="./chat-app-video.mp4"
            muted
            autoPlay
            loop
            className="w-full mx-0 rounded-[50px] h-[100.1%] overflow-hidden object-cover absolute top-0 left-0 [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)]"
          />
        </div>

        {/* Blue Box */}
        <div
          ref={thirdBoxRef}
          className="w-1/2 mt-10 -mr-4 rounded-[50px] bg-blue-500 text-black h-[95%] z-30 absolute right-1 translate-y-full"
        >
          <div
            className="
            absolute top-0 w-full h-full rounded-[50px] bg-[#f5f5f5] p-8 flex flex-col
  "
          >
            <div className="flex flex-col justify-center items-center my-3">
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">
                {t("projects.bmwSite.title")}
              </h3>
              <p className="text-lg text-gray-700">
                {t("projects.bmwSite.description")}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <ul className="list-inside space-y-2 text-lg lg:text-[20px]">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.bmwSite.features.0")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.bmwSite.features.1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.bmwSite.features.2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.bmwSite.features.3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.bmwSite.features.4")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            ref={overlayRef2}
            className="w-full h-full rounded-[50px] bg-[#f5f5f5] p-8
    [clip-path:polygon(0_0%,100%_0%,100%_100%,0%_100%)] flex flex-col"
          >
            <div className="flex flex-col justify-center items-center my-3">
              <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">
                {t("projects.foodOrder.title")}
              </h3>
              <p className="text-lg text-gray-700">
                {t("projects.foodOrder.description")}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <ul className="list-inside space-y-3 text-lg lg:text-[20px]">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.0")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.4")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.5")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{t("projects.foodOrder.features.6")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Yellow Box */}
        <div
          ref={fourthBoxRef}
          className="w-1/2 mt-10 -mr-4 rounded-[50px] bg-[#f5f5f5] h-[95%] z-0 absolute right-1 translate-y-full"
        >
          <video
            src="./bmw-video.mp4"
            muted
            autoPlay
            loop
            className="w-full mx-0 rounded-[50px] h-[100.1%] overflow-hidden object-cover absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
