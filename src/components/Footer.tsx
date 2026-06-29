'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative mt-auto pt-12 pb-8 flex flex-col items-center justify-center overflow-hidden">

      {/* 🌟 Línea divisoria superior estilo tubo de neón */}
      <div className="absolute top-0 w-full flex justify-center pointer-events-none">
        <div className="w-3/4 max-w-md h-[1px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
        <div className="absolute top-0 w-1/2 max-w-xs h-[1px] bg-red-400 blur-[3px] opacity-50"></div>
      </div>

      {/* 📍 Indicador de Ubicación */}
      <div className="flex items-center gap-2 mb-7 group cursor-default bg-white/[0.02] border border-white/[0.05] px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-white/[0.04] hover:border-red-500/20 hover:-translate-y-0.5">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-red-500/60 group-hover:text-[#ff7f50] relative z-10 transition-colors duration-300"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-white/80 transition-colors duration-300 drop-shadow-sm">
          Cobertura en Tizayuca
        </p>
      </div>

      {/* ©️ Copyright y Firma de Agencia */}
      <div className="flex flex-col items-center gap-5">

        <div className="flex items-center gap-2 text-white/30 text-[9px] sm:text-[10px] uppercase tracking-widest hover:text-white/60 transition-colors duration-500">
          <span>&copy; {currentYear} Taxi Manrrique</span>
          <span className="text-red-500/40">•</span>
          <span>Todos los derechos reservados</span>
        </div>

        {/* 💻 NUEVA FIRMA: Insignia visible y clickeable de Syntaxis Lab */}
        <div className="relative group">
          {/* Resplandor animado de fondo para llamar la atención sutilmente */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-red-500 to-[#ff7f50] rounded-full blur opacity-30 animate-pulse group-hover:opacity-60 transition duration-500"></div>

          <a
            href="https://sintaxis-lab-gamma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icono de desarrollo (Código) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)] group-hover:text-[#ff7f50] transition-colors">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>

            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-colors">
              Desarrollado por <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-[#ff7f50] drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]">Syntaxis Lab</span>
            </span>
          </a>
        </div>

      </div>

      {/* Luz base muy sutil */}
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-64 h-24 bg-red-600/10 rounded-full blur-[40px] pointer-events-none z-[-1]"></div>

    </footer>
  );
}
