import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const RotatingTextCircle = () => {
  const svgRef = useRef(null);
  const { t } = useTranslation();
  const rotatingText = t("rotatingText.text");

  useLayoutEffect(() => {
    const el = svgRef.current;

    const rotationTween = gsap.to(el, {
      rotation: 360,
      transformOrigin: "50% 50%",
      ease: "none",
      repeat: -1,
      duration: parseFloat(el.dataset.duration) || 5,
    });

    const onEnter = () =>
      gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onUpdate: ({ progress }) => {
        rotationTween.timeScale(0.5 + progress * 2);
      },
    });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      rotationTween.kill();
      scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <div className="hidden md:block pt-30 pl-16 lg:pl-20 lg:pt-36 overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        data-duration="5"
        className="absolute w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] max-h-[75vh] max-w-[75vw] overflow-visible origin-center stroke-current stroke-opacity-50"
      >
        <path
          id="textcircle"
          fill="none"
          strokeWidth="5"
          d="M50,250
             c0-110.5,89.5-200,200-200
             s200,89.5,200,200
             s-89.5,200-200,200
             S50,360.5,50,250"
        />
        <text
          dy="-25"
          className="text-[35px] md:text-[45px] font-spacegrotesk font-black fill-current text-white tracking-[2.5px]"
        >
          <textPath href="#textcircle" method="align" spacing="auto">
            {rotatingText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default RotatingTextCircle;
