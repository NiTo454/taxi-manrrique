'use client';
import { TAXI_INFO } from '../config/info';

export default function CallButton() {
  const numeroTelefono = TAXI_INFO.phone.full;

  // Función para generar y descargar el contacto (vCard)
  const descargarContacto = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Manrrique;Taxi;;;
FN:${TAXI_INFO.brandName}
ORG:${TAXI_INFO.tagline} ${TAXI_INFO.coverage}
TEL;TYPE=CELL,VOICE:${TAXI_INFO.phone.full}
URL:${TAXI_INFO.websiteUrl}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${TAXI_INFO.brandName.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <a
        href={`tel:${numeroTelefono}`}
        className="group relative flex items-center justify-center w-full bg-[#121212] border border-wine-500/50 hover:bg-wine-500/10 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(158,28,59,0.1)] hover:shadow-[0_0_20px_rgba(158,28,59,0.3)] hover:scale-105 overflow-hidden"
      >
        {/* Ícono de Teléfono */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-wine-300">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>

        <span className="tracking-wide">Llamar ahora</span>
      </a>

      {/* Botón de Guardar Contacto (vCard) */}
      <button
        onClick={descargarContacto}
        className="group relative flex items-center justify-center w-full bg-[#121212] border border-wine-500/50 hover:bg-wine-500/10 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(146,0,0,0.1)] hover:shadow-[0_0_20px_rgba(146,0,0,0.3)] hover:scale-105 overflow-hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-wine-300 group-hover:scale-110 transition-transform">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
        <span className="tracking-wide">Guardar Contacto</span>
      </button>
    </div>
  );
}
