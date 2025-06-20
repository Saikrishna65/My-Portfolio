import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const tlRef = useRef(null);
  const linksRef = useRef([]);

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
      linksRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!tlRef.current) return;
    open ? tlRef.current.play() : tlRef.current.reverse();
  }, [open]);

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

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.certificates"), href: "#certificates" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

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
        <div className="h-full w-full flex flex-col items-center justify-center px-6 overflow-auto">
          <ul className="space-y-6 text-center text-black text-2xl font-semibold">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  ref={(el) => (linksRef.current[idx] = el)}
                  className="hover:text-blue-600 transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
