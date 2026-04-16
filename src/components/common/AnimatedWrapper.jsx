import React, { useEffect, useRef } from 'react';

/**
 * AnimatedWrapper — wraps children and triggers
 * a CSS class on scroll-into-view using IntersectionObserver.
 *
 * Props:
 *  - className: extra CSS class on wrapper div
 *  - animClass: animation class to add (default: 'animate-fade-in-up')
 *  - threshold: IntersectionObserver threshold (default 0.15)
 *  - children
 */
const AnimatedWrapper = ({
  children,
  className = '',
  animClass = 'animate-fade-in-up',
  threshold = 0.15,
  delay = 0,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add(animClass), delay);
          } else {
            el.classList.add(animClass);
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animClass, threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
