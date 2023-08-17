import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
    const [isSmallScreen, setSmallScreen] = useState(false);


    useEffect(() => {
      const mql = window.matchMedia(query);
  
      function handleMediaQueryChange(e: MediaQueryListEvent) {
        setSmallScreen(e.matches);
      }
  
      mql.addEventListener('change', handleMediaQueryChange);
  
      setSmallScreen(mql.matches);
  
      return () => mql.removeEventListener('change', handleMediaQueryChange);
    }, [query, setSmallScreen]);


    return isSmallScreen;
}