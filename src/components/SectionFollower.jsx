import React, { useRef, useState } from "react";
import { gsap } from "gsap";

// A single hover-follower section that fills its parent cell:
const SectionFollower = ({ imageUrl, children }) => {
  const containerRef = useRef(null);
  const followerRef = useRef(null);
  const [active, setActive] = useState(false);

  const onEnter = () => {
    setActive(true);
    gsap.to(followerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    gsap.to(followerRef.current, {
      left: offsetX,
      top: offsetY,
      duration: 0.02,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    setActive(false);
    gsap.to(followerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full cursor-pointer"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Centered content */}
      <div className="text-xl md:text-2xl font-medium z-10 text-center">
        {children}
      </div>

      {/* Hover follower with background image */}
      <div
        ref={followerRef}
        className="absolute w-24 h-24 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default SectionFollower;
