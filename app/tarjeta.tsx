'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaFilePdf, FaArrowLeft } from 'react-icons/fa';
// Mariposas removidas
import { MdVerified as VerifiedIcon, MdAccountBalance as BankIcon } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface TarjetaProps {
  onClose?: () => void;
}

export default function Tarjeta({ onClose }: TarjetaProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Referencias exclusivas para el motor de captura
  const frenteExportRef = useRef<HTMLDivElement>(null);
  const reversoExportRef = useRef<HTMLDivElement>(null);

  const exportarPDF = async () => {
    if (!frenteExportRef.current || !reversoExportRef.current) return;
    setIsExporting(true);

    try {
      // Configuramos html-to-image para Alta Definición (3x)
      const opcionesCaptura = {
        pixelRatio: 3,
        cacheBust: true, // Evita problemas con imágenes oxidadas en caché
        backgroundColor: '#121212',
      };

      // 1. Captura nativa y moderna del DOM (Adiós error de oklab)
      const imgFrente = await toPng(frenteExportRef.current, opcionesCaptura);
      const imgReverso = await toPng(reversoExportRef.current, opcionesCaptura);

      // 2. Construcción del PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85, 55], // Formato físico estándar
      });

      // Página 1
      pdf.addImage(imgFrente, 'PNG', 0, 0, 85, 55, undefined, 'FAST');

      // Página 2
      pdf.addPage([85, 55], 'landscape');
      pdf.addImage(imgReverso, 'PNG', 0, 0, 85, 55, undefined, 'FAST');

      // Descargar
      pdf.save('Tarjeta_Digital_Taxi_Manrrique.pdf');
    } catch (error) {
      console.error("Error al exportar el PDF:", error);
      alert("Hubo un error al generar el PDF. Revisa la consola.");
    } finally {
      setIsExporting(false);
    }
  };

  // Tu diseño original de Tailwind (100% intacto)
  const ContenidoTarjeta = ({ lado }: { lado: 'front' | 'back' }) => (
    <div className="w-[340px] h-[220px] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] border border-red-500/30 rounded-xl overflow-hidden flex flex-col justify-between p-5 relative shadow-2xl select-none text-left">

      {/* Camino de Carretera */}
      <svg className="absolute -top-4 -right-4 text-red-500/5 text-7xl rotate-12 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 10 L60 110" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="60" cy="30" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="45" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="75" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="90" r="4" fill="currentColor" opacity="0.6" />
      </svg>
      <svg className="absolute -bottom-4 -left-4 text-red-500/5 text-7xl -rotate-12 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 10 L60 110" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="60" cy="30" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="45" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="75" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="90" r="4" fill="currentColor" opacity="0.6" />
      </svg>

      {lado === 'front' ? (
        <>
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <div className="relative w-full h-full rounded-full overflow-hidden border border-red-500/40 bg-black">
                <Image src="/foto_perfil.jpeg" alt="Taxi Manrrique" fill className="object-cover" unoptimized priority />
              </div>
              <VerifiedIcon className="absolute -bottom-0.5 -right-0.5 text-red-400 text-lg bg-black rounded-full" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg font-black text-white tracking-[0.15em] leading-none uppercase">
                TAXI <span className="text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">MANRRIQUE</span>
              </h1>
              <p className="text-red-200/80 text-[8px] font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-1.5">
                Transporte Seguro
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-1"></div>

          <div className="flex flex-col gap-2 relative z-10 w-full pl-1 mb-1">
             <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <FaPhoneAlt className="text-red-400" size={9} />
                </div>
                <span className="text-xs font-black text-white tracking-[0.2em]">56 3254 3475</span>
             </div>
             <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400"><path d="M12 2L15.09 8.26h6.79l-5.5 4L16.91 19 12 15l-4.91 4 1.63-6.74l-5.5-4h6.79z"/></svg>
                </div>
                <span className="text-xs font-bold text-red-200/90 tracking-[0.15em]">Pide tu viaje por WhatsApp</span>
             </div>
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-between gap-3 relative z-10 h-full">
           <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden border border-red-500/30 bg-white p-1.5 flex-shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
              <Image src="/qr.jpeg" alt="QR Taxi Manrrique" fill className="object-contain" unoptimized />
           </div>

           <div className="flex flex-col items-center flex-grow text-center justify-center h-full">
              <h2 className="text-[9px] font-black text-red-400 tracking-[0.25em] uppercase mb-1">Pago Directo</h2>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-2"></div>

              <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-1.5 text-red-200/70">
                  <BankIcon size={11} className="text-yellow-400" />
                  <span className="text-[9px] font-extrabold tracking-[0.15em] text-yellow-400 uppercase">COPPEL</span>
                </div>
                <div className="bg-black/40 border border-red-500/30 px-2 py-1 rounded w-full">
                  <span className="text-[10px] font-mono font-black text-white tracking-wider block">
                    4169 1614 3056 3311
                  </span>
                </div>
                <span className="text-[8px] font-black text-red-100 tracking-wider uppercase mt-0.5">
                  Manrrique Rodriguez
                </span>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-[#0a0a0a] relative overflow-x-hidden">

      <div className="text-center mb-6 select-none z-10">
        <p className="text-xs font-bold text-red-400/80 uppercase tracking-widest mb-1">Tarjeta Digital Interactiva</p>
        <p className="text-[11px] text-zinc-500">Toca la tarjeta para ver el reverso</p>
      </div>

      {/* VISTA WEB INTERACTIVA (3D) */}
      <div className="flex flex-col items-center w-full z-10">
        <div
          className="w-[340px] h-[220px] relative cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
              <ContenidoTarjeta lado="front" />
            </div>
            <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <ContenidoTarjeta lado="back" />
            </div>
          </div>
        </div>
      </div>

      {/* 📥 CONTENEDOR OCULTO PARA EXPORTACIÓN CON HTML-TO-IMAGE
          html-to-image prefiere que el elemento esté en el DOM sin display: none ni opacity: 0.
          Lo posicionamos fuera de la pantalla de forma segura.
      */}
      <div className="absolute left-[-9999px] top-0 flex flex-col gap-4 z-0">
        <div ref={frenteExportRef}>
          <ContenidoTarjeta lado="front" />
        </div>
        <div ref={reversoExportRef}>
          <ContenidoTarjeta lado="back" />
        </div>
      </div>

      {/* BOTÓN DE EXPORTACIÓN */}
      <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-xs z-10">
        <button
          onClick={exportarPDF}
          disabled={isExporting}
          className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:from-red-500 hover:to-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] active:scale-95 disabled:opacity-50"
        >
          <FaFilePdf size={16} />
          {isExporting ? 'Renderizando PDF...' : 'Descargar PDF Impecable'}
        </button>

        {onClose && (
          <button onClick={onClose} className="text-red-300/50 text-xs flex items-center gap-2 hover:text-red-300 transition-colors mt-2">
            <FaArrowLeft /> Volver al menú
          </button>
        )}
      </div>
    </div>
  );
}
