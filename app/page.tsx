'use client';
import { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar';
import ProfileHeader from '../src/components/ProfileHeader';
import WhatsAppButton from '../src/components/WhatsAppButton';
import CallButton from '../src/components/CallButton';
import PaymentMethods from '../src/components/PaymentMethods';
import Footer from '../src/components/Footer';
import Tarjeta from './tarjeta';
import PageLoader from '../src/components/PageLoader';

export default function Home() {
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  // 1. Controlar el botón de retroceso (Back button) del navegador
  useEffect(() => {
    const handlePopState = () => {
      // Si el hash es #tarjeta, mostramos la tarjeta. Si no, volvemos al inicio.
      setMostrarTarjeta(window.location.hash === '#tarjeta');
    };

    // Revisar el hash al cargar por primera vez
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 2. Función para ir a la tarjeta y añadirlo al historial del navegador
  const openTarjeta = () => {
    if (window.location.hash !== '#tarjeta') {
      window.history.pushState(null, '', '#tarjeta');
    }
    setMostrarTarjeta(true);
  };

  // 3. Función para regresar al inicio (como si presionaran "Atrás" en el navegador)
  const closeTarjeta = () => {
    if (window.location.hash === '#tarjeta') {
      window.history.back(); // Esto dispara el 'popstate' y oculta la tarjeta suavemente
    } else {
      setMostrarTarjeta(false);
    }
  };

  return (
    <>
      {/* Pantalla de carga superpuesta automatizada.
          El atributo 'key' obliga a React a reiniciar la animación cada vez que la vista cambia. */}
      <PageLoader key={mostrarTarjeta ? 'tarjeta' : 'inicio'} />

      {/* Contenido principal de la página. */}
      <main className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200 flex flex-col">
      <Navbar
        onShowTarjeta={openTarjeta}
        onHome={closeTarjeta}
      />

      {/* Contenedor centralizado para la tarjeta */}
      <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Brillo de fondo centralizado (se muestra cuando está la tarjeta) */}
        {mostrarTarjeta && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        )}

        {!mostrarTarjeta ? (
          <div className="w-full max-w-md relative animate-slide-up">
            {/* Aura / Resplandor de fondo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            {/* Tarjeta Principal (Glassmorphism) */}
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-red-500/20 rounded-[2rem] p-8 shadow-2xl flex flex-col items-center">

              <ProfileHeader />

              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent my-8"></div>

              <div className="flex flex-col gap-4 w-full">
                <WhatsAppButton />
                <CallButton />
              </div>

              <div className="mt-10 w-full">
                <PaymentMethods />
              </div>

            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm relative animate-slide-up z-10">
            {/* La tarjeta usa la función closeTarjeta para manejar correctamente el historial */}
            <Tarjeta onClose={closeTarjeta} />
          </div>
        )}
      </div>

      <Footer />
    </main>
    </>
  );
}
