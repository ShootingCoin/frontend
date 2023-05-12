import { useEffect, useMemo, useState } from "react";

export default function useLayoutConfig() {
  const [contentAreaHeight, setContentAreaHeight] = useState('100vh');
  const updateContentAreaHeight = () => {
    const headers = document.querySelectorAll('header');
    const navs = document.querySelectorAll('nav');
    
    let headerHeight = 0;
    if (headers.length > 0) {
      headers.forEach(x => { headerHeight += x.clientHeight; });
    }
    if (navs.length > 0) {
      navs.forEach(x => { headerHeight += x.clientHeight; });
    }
    setContentAreaHeight(`${window.innerHeight - headerHeight}px`);
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
      updateContentAreaHeight();
    }
    window.addEventListener('load', updateContentAreaHeight);
    window.addEventListener('resize', updateContentAreaHeight);
    return () => {
      window.removeEventListener('load', updateContentAreaHeight);
      window.removeEventListener('resize', updateContentAreaHeight);
    };
  }, []);

  return useMemo(() => ({
    contentAreaHeight,
  }), [
    contentAreaHeight,
  ]);
};
