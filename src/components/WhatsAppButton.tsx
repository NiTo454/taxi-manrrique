'use client';
import { useState, useEffect } from 'react';
import { TAXI_INFO } from '../config/info';

export default function WhatsAppButton() {
  const numeroWhatsApp = TAXI_INFO.phone.raw;
  const [mensaje, setMensaje] = useState(TAXI_INFO.whatsapp.message);

  useEffect(() => {
    const hora = new Date().getHours();
    let saludo = 'buenas noches';
    if (hora >= 6 && hora < 12) saludo = 'buenos días';
    else if (hora >= 12 && hora < 19) saludo = 'buenas tardes';

    setMensaje(`Hola Manrrique, ${saludo}. Me gustaría solicitar un viaje por favor.`);
  }, []);

  return (
    <div className="w-full">
      <a
        href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-full bg-gradient-to-r from-wine-600 to-wine-400 hover:from-wine-500 hover:to-wine-300 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(158,28,59,0.4)] hover:shadow-[0_0_25px_rgba(158,28,59,0.7)] hover:scale-105 overflow-hidden"
      >
        {/* Efecto de brillo interno */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
        <span className="tracking-wide">Pedir Taxi por WhatsApp</span>
      </a>
    </div>
  );
}
