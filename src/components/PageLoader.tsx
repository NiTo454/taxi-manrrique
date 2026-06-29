'use client';
import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Bloqueamos el scroll de la página mientras carga
    document.body.style.overflow = 'hidden';

    // 2. Tiempo mínimo para que la animación se aprecie bien (1.5 segundos)
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Promesa vinculada al evento de carga real de la ventana
    let handleLoad: () => void;
    const loadPromise = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        handleLoad = () => resolve(true);
        window.addEventListener('load', handleLoad);
      }
    });

    Promise.all([minTimePromise, loadPromise]).then(() => {
      setIsFadingOut(true); // Comienza la transición CSS (fade-out)
      setTimeout(() => {
        setIsLoading(false); // Quitamos la capa del DOM
        document.body.style.overflow = ''; // Restauramos el scroll
      }, 500); // 500ms para coincidir con la transición
    });

    return () => {
      if (handleLoad) window.removeEventListener('load', handleLoad);
      document.body.style.overflow = ''; // Limpieza por seguridad si se desmonta
    };
  }, []);

  if (!isLoading) return null;

  return <SplashScreen isFadingOut={isFadingOut} />;
}
