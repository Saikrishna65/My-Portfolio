import React, { useRef, useState, useEffect, forwardRef } from "react";

const LazyVideo = forwardRef(({ src, className, poster }, ref) => {
  const localRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const targetRef = ref?.current ? ref : localRef;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return (
    <video
      ref={ref || localRef}
      className={className}
      muted
      autoPlay
      loop
      playsInline
      poster={poster} // ✅ Add poster attribute here
      preload="auto" // Optional but improves loading performance
    >
      {isInView && <source src={src} type="video/mp4" />}
    </video>
  );
});

export default LazyVideo;
