import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const tlRef = useRef(null);

  // GSAP sidebar animation
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      sidebarRef.current,
      {
        x: "100%",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
      },
      {
        x: "0%",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );
    tl.fromTo(
      headingRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
    tl.fromTo(
      paragraphRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  // Disable/enable scroll when sidebar toggles
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Play or reverse GSAP timeline on open state
  useEffect(() => {
    if (!tlRef.current) return;
    open ? tlRef.current.play() : tlRef.current.reverse();
  }, [open]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed top-4 right-4 z-50 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center focus:outline-none"
      >
        <span
          className={`absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
            open ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 inset-y-0 right-0 z-40 w-full md:w-[450px] h-full overflow-hidden bg-white"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="h-full w-full flex items-center justify-center px-6 overflow-auto">
          <div className="space-y-4">
            <h2
              ref={headingRef}
              className="text-black font-bold text-4xl opacity-0"
            >
              Sidebar
            </h2>
            <p
              ref={paragraphRef}
              className="text-black text-2xl opacity-0 max-w-sm"
            >
              Your sidebar content goes here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
