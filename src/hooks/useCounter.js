import { useState, useRef, useEffect } from 'react';

const useCounter = (target, suffix = '', duration = 1600) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const steps = 50;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + target / steps, target);
          setValue(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, duration / steps);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [value + suffix, ref];
};

export default useCounter;
