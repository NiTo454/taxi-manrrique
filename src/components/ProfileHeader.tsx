'use client';
import Image from 'next/image';

export default function ProfileHeader() {
  // Función para compartir el perfil usando la Web Share API nativa del celular
  const compartirPerfil = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Taxi Manrrique | Tarjeta Digital',
          text: 'Viajes seguros, rápidos y de absoluta confianza en Tizayuca. ¡Pide tu taxi aquí!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      // Fallback para navegadores que no soportan Share API (ej. PC)
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de la tarjeta copiado al portapapeles!');
    }
  };

  return (
    <header className="flex flex-col items-center text-center w-full group">

      {/* Avatar interactivo con flotación */}
      <div className="relative w-48 h-48 sm:w-52 sm:h-52 mb-6 mt-2 transition-transform duration-500 group-hover:scale-105 animate-float">

        {/* Aura exterior vibrante que respira con el hover (Rojo y Dorado) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-amber-500 to-red-700 rounded-full blur-[25px] opacity-40 group-hover:opacity-80 group-hover:blur-[35px] transition-all duration-700 ease-out"></div>

        {/* Anillo de borde neón giratorio */}
        <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-red-500 via-amber-400 to-red-600 shadow-[0_0_25px_rgba(220,38,38,0.5)] z-10 animate-spin-slow group-hover:animate-spin-fast"></div>

        {/* Contenedor de la Imagen (Estático para que la foto no gire) */}
        <div className="absolute inset-[3px] rounded-full overflow-hidden bg-[#050505] z-20">

          {/* ✨ Efecto de destello de cristal (Shine) al pasar el cursor ✨ */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-30 pointer-events-none"></div>

          <Image
            src="/foto_perfil.jpeg"
            alt="Taxi Manrrique - Perfil"
            fill
            priority
            sizes="(max-width: 768px) 208px, 208px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Badge de Verificación con efecto de pulso (En línea) */}
        <div className="absolute bottom-1 right-1 z-40">
          <div className="relative">
            {/* Ping de fondo */}
            <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-60"></div>
            {/* Badge estático */}
            <div
              className="relative bg-[#0a0a0a] rounded-full p-1.5 border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-transform duration-300 hover:scale-110 hover:rotate-12 bg-opacity-90 backdrop-blur-sm cursor-help"
              title="Conductor Verificado"
              aria-label="Conductor Verificado"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,1)]">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Título Principal con gradiente en movimiento continuo */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        Taxi <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500 animate-text-gradient drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Manrrique</span>
      </h1>

      {/* Contenedor de insignias (Estrellas + Compartir) */}
      <div className="flex items-center justify-center gap-3 mb-6 relative z-10">

        {/* Badge de Estrellas (Estilo Píldora de Cristal) */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:-translate-y-0.5 cursor-default" title="Calificación perfecta">
          <span className="text-amber-400 text-sm tracking-[0.15em] drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">★★★★★</span>
          <div className="w-[1px] h-3 bg-white/20 mx-1"></div>
          <span className="text-white text-sm font-bold tracking-wider drop-shadow-md">5.0</span>
        </div>

        {/* Botón de Compartir (Web Share API) */}
        <button
          onClick={compartirPerfil}
          aria-label="Compartir Tarjeta"
          title="Compartir Tarjeta"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/20 hover:scale-110 hover:-translate-y-0.5 active:scale-95 group/share"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover/share:text-amber-300 transition-colors drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>

      </div>

      {/* Descripción enmarcada en cristal premium */}
      <div className="relative px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] max-w-[320px] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:border-red-500/20">
        <p className="text-red-50/85 text-sm leading-relaxed font-light drop-shadow-sm">
          Viajes seguros, rápidos y de absoluta confianza. <strong className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Tu comodidad es nuestra prioridad.</strong>
        </p>
      </div>

      {/* Estilos CSS integrados para animaciones personalizadas */}
      <style>{`
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .animate-spin-fast { animation: spin 1.5s linear infinite; }
        .animate-text-gradient {
          background-size: 200% auto;
          animation: textGradient 4s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes textGradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </header>
  );
}
