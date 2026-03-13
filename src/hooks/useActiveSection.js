import { useState, useEffect } from 'react';

const useActiveSection = (sectionIds = [], threshold = 0.4) => {
  const [active, setActive] = useState(sectionIds[0] || '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold }
    );
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sectionIds, threshold]);
  return active;
};

export default useActiveSection;
