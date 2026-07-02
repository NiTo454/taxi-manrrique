'use client';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { TAXI_INFO } from '../config/info';

interface SplashScreenProps {
  isFadingOut: boolean;
}

export default function SplashScreen({ isFadingOut }: SplashScreenProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/d1821cfa-117f-11ee-b660-17c58d4d74ba.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error al cargar la animación Lottie:", err));
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Luces de fondo Neón */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-wine-600/15 rounded-full blur-[90px] animate-pulse"></div>
        <div className="w-72 h-72 bg-wine-700/15 rounded-full blur-[90px] -ml-24" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Contenedor del Lottie */}
        <div className="relative w-72 h-56 flex items-center justify-center drop-shadow-[0_0_35px_rgba(158,28,59,0.4)]">

          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-12 h-12 border-2 border-wine-500/20 border-t-wine-500 rounded-full animate-spin"></div>
          )}

        </div>

        {/* Logo */}
        <h2 className="mt-6 text-white text-3xl font-black tracking-[0.25em] uppercase flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {TAXI_INFO.brandName.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-wine-300 via-wine-500 to-wine-600 animate-pulse">{TAXI_INFO.brandName.split(' ').slice(1).join(' ')}</span>
        </h2>

        {/* Indicador de carga */}
        <div className="mt-8 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-wine-500 rounded-full animate-ping"></span>
            <span className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">Cargando</span>
          </div>
        </div>
      </div>
    </div>
  );
}
