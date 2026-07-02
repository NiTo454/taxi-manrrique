'use client';
import Link from 'next/link';
import { TAXI_INFO } from '../config/info';

interface NavbarProps {
  onShowTarjeta?: () => void;
  onHome?: () => void;
}

export default function Navbar({ onShowTarjeta, onHome }: NavbarProps) {
  const brandParts = TAXI_INFO.brandName.split(' ');
  const brandFirst = brandParts[0].toUpperCase();
  const brandRest = brandParts.slice(1).join(' ').toUpperCase();

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all">

      {/* Luz neón de color vino en el borde inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-wine-500 to-transparent opacity-50"></div>

      <div className="max-w-md mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo / Nombre - Interactivo con efecto de aceleración */}
        <Link href="/" onClick={onHome} className="flex items-center gap-2 group cursor-pointer">

          {/* Contenedor del SVG con resplandor en hover */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-wine-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-[#ff7f50] group-hover:text-wine-400 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>

          {/* Título con gradiente de color vino coherente */}
          <span className="font-extrabold text-lg tracking-wider text-white transition-colors drop-shadow-md">
            {brandFirst} <span className="text-transparent bg-clip-text bg-gradient-to-r from-wine-400 via-wine-300 to-wine-500 drop-shadow-[0_0_10px_rgba(158,28,59,0.3)]">{brandRest}</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">

          {/* Etiqueta de estado premium */}
          <div className="hidden sm:flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-default">
            {/* Punto parpadeante */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wine-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-wine-500 shadow-[0_0_5px_#9e1c3b]"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/80 font-bold">
              Disponible
            </span>
          </div>

          {/* Botón de Tarjeta Digital */}
          <button
            onClick={onShowTarjeta}
            className="group flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-wine-500/20 hover:border-wine-500/50 hover:scale-105 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(158,28,59,0.4)] backdrop-blur-sm"
            title="Ver Tarjeta de Contacto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-3">
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <line x1="7" y1="15" x2="7.01" y2="15"></line>
              <line x1="11" y1="15" x2="15" y2="15"></line>
            </svg>
          </button>

        </div>

      </div>
    </nav>
  );
}
