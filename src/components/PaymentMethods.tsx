'use client';
import { useState } from 'react';
import { TAXI_INFO } from '../config/info';

export default function PaymentMethods() {
  const [copiado, setCopiado] = useState<string>('');
  const [errorCopiar, setErrorCopiar] = useState<string>('');

  const copiarDatos = async (texto: string, referencia: string): Promise<void> => {
    let exito = false;

    try {
      if (navigator?.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(texto);
        exito = true;
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        textArea.setAttribute("readonly", "readonly");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 999999);

        exito = document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Error al intentar copiar:", err);
      exito = false;
    }

    if (exito) {
      setCopiado(referencia);
      setErrorCopiar('');
      setTimeout(() => setCopiado(''), 3000);
    } else {
      setErrorCopiar(referencia);
      setCopiado('');
      setTimeout(() => setErrorCopiar(''), 5000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] self-start">
        Método de Pago
      </h2>

      {/* Contenedor de la Tarjeta (Réplica Exacta BanCoppel) */}
      <div className="relative w-full max-w-[360px] aspect-[1.59/1] rounded-[20px] bg-gradient-to-br from-[#ffdc00] via-[#ffe338] to-[#f5cc00] p-5 sm:p-6 flex flex-col justify-between overflow-hidden group transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(255,214,0,0.3)] hover:shadow-[0_15px_40px_rgba(158,28,59,0.4)] border border-yellow-300 select-none">

        {/* Resplandor radial claro en el centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/40 rounded-full blur-[40px] pointer-events-none"></div>

        {/* Efecto de reflejo holográfico animado */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none transform -skew-x-12 w-[150%] -ml-[50%]"></div>

        {/* Fila Superior: Logo BanCoppel, DÉBITO y Contactless */}
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-0.5">
            <span className="text-2xl font-bold text-[#004ea8] tracking-tight font-sans">
              BanCoppel
            </span>
            <span className="text-[8px] font-bold text-[#004ea8] align-top -mt-2">®</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#004ea8]">
            <span className="text-xs font-black tracking-wider uppercase">DÉBITO</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
              <path d="M8.5 4a23.6 23.6 0 0 1 0 16"/><path d="M13.5 6a18.6 18.6 0 0 1 0 12"/><path d="M18.5 8a13.6 13.6 0 0 1 0 8"/>
            </svg>
          </div>
        </div>

        {/* Centro de la Tarjeta: Llave de BanCoppel y Chip Plata */}
        <div className="relative z-10 flex items-center justify-between my-auto px-2">
          {/* Icono de la Llave BanCoppel */}
          <div className="flex items-center justify-center text-[#004ea8] drop-shadow-sm ml-6">
            <svg width="60" height="30" viewBox="0 0 60 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="10" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="10" cy="21" r="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="10" cy="15" r="2.5" fill="currentColor" />
              <rect x="17" y="13.5" width="28" height="3" fill="currentColor" rx="1" />
              <rect x="36" y="16.5" width="3" height="5" fill="currentColor" />
              <rect x="41" y="16.5" width="4" height="7" fill="currentColor" />
            </svg>
          </div>

          {/* Chip Plata Estilo BanCoppel */}
          <div className="w-11 h-9 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 rounded-lg shadow-inner flex flex-col justify-between p-[3px] border border-gray-400/80 mr-1">
            <div className="w-full h-[1px] bg-gray-400/60"></div>
            <div className="w-full flex justify-between items-center h-full my-0.5">
              <div className="w-[1px] h-full bg-gray-400/60"></div>
              <div className="w-3.5 h-full border border-gray-400/60 rounded-sm"></div>
              <div className="w-[1px] h-full bg-gray-400/60"></div>
            </div>
            <div className="w-full h-[1px] bg-gray-400/60"></div>
          </div>
        </div>

        {/* Fila Inferior: Datos de Transferencia y Logo VISA */}
        <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <p className="font-mono text-[16px] min-[375px]:text-[17px] sm:text-[18px] tracking-[0.12em] text-[#002d6b] font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {TAXI_INFO.bank.clabe}
              </p>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#003c8a] mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {TAXI_INFO.driverName}
              </span>
            </div>

            <div className="text-right pb-0.5">
              <span className="text-2xl font-extrabold italic text-white tracking-tighter drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] font-serif">
                VISA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de Copiar Externo */}
      <button
        onClick={() => copiarDatos(TAXI_INFO.bank.clabeRaw, 'coppel')}
        aria-live="polite"
        className={`mt-8 w-full max-w-[360px] py-3.5 px-4 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 text-sm font-semibold active:scale-95 shadow-lg backdrop-blur-sm ${
          copiado === 'coppel'
            ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'bg-wine-600/15 border border-wine-500/40 text-wine-100 hover:bg-wine-600/25 hover:border-wine-500/70 shadow-[0_0_15px_rgba(158,28,59,0.15)] hover:shadow-[0_0_20px_rgba(158,28,59,0.3)]'
        }`}
      >
        {copiado === 'coppel' ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>¡Número Copiado al Portapapeles!</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copiar Número de Tarjeta Coppel</span>
          </>
        )}
      </button>

      {/* Mensaje de error con estilo integrado */}
      {errorCopiar === 'coppel' && (
        <div className="mt-4 w-full max-w-[360px] bg-red-900/30 text-red-300 text-xs py-3 px-4 rounded-xl border border-red-500/40 text-center backdrop-blur-md animate-pulse">
          No se pudo copiar automáticamente. Por favor, selecciona el número de arriba.
        </div>
      )}
    </div>
  );
}
