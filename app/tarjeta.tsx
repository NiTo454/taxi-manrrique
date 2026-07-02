'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaFilePdf, FaArrowLeft, FaImage } from 'react-icons/fa';
import { GiButterfly } from 'react-icons/gi';
import { MdVerified as VerifiedIcon, MdAccountBalance as BankIcon } from 'react-icons/md';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { TAXI_INFO } from '../src/config/info';

interface TarjetaProps {
  onClose?: () => void;
}

export default function Tarjeta({ onClose }: TarjetaProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Referencias exclusivas para el motor de captura
  const frenteExportRef = useRef<HTMLDivElement>(null);
  const reversoExportRef = useRef<HTMLDivElement>(null);

  // Coordenadas táctiles para control de gestos (Swipe)
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Manejo de gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Umbral en píxeles

    if (Math.abs(diffX) > minSwipeDistance) {
      setIsFlipped(prev => !prev);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Manejo de accesibilidad por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(prev => !prev);
    }
  };

  const exportarPDF = async () => {
    if (!frenteExportRef.current || !reversoExportRef.current) return;
    setIsExporting(true);
    setFeedbackMessage('Generando PDF Impecable...');

    try {
      const opcionesCaptura = {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#121212',
      };

      const imgFrente = await toPng(frenteExportRef.current, opcionesCaptura);
      const imgReverso = await toPng(reversoExportRef.current, opcionesCaptura);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85, 55],
      });

      pdf.addImage(imgFrente, 'PNG', 0, 0, 85, 55, undefined, 'FAST');
      pdf.addPage([85, 55], 'landscape');
      pdf.addImage(imgReverso, 'PNG', 0, 0, 85, 55, undefined, 'FAST');

      pdf.save(`Tarjeta_Digital_${TAXI_INFO.brandName.replace(/\s+/g, '_')}.pdf`);
      setFeedbackMessage('¡PDF descargado con éxito!');
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error("Error al exportar el PDF:", error);
      setErrorMessage("No se pudo generar el PDF.");
      setTimeout(() => setErrorMessage(''), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const exportarPNG = async () => {
    if (!frenteExportRef.current || !reversoExportRef.current) return;
    setIsExporting(true);
    setFeedbackMessage('Generando imagen de alta calidad...');

    try {
      const opcionesCaptura = {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#121212',
      };

      const activeRef = isFlipped ? reversoExportRef.current : frenteExportRef.current;
      const imgData = await toPng(activeRef, opcionesCaptura);

      const a = document.createElement('a');
      a.href = imgData;
      a.download = `Tarjeta_${TAXI_INFO.brandName.replace(/\s+/g, '_')}_${isFlipped ? 'Reverso' : 'Frente'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setFeedbackMessage('¡Imagen descargada con éxito!');
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error("Error al exportar la imagen PNG:", error);
      setErrorMessage("No se pudo generar la imagen.");
      setTimeout(() => setErrorMessage(''), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const ContenidoTarjeta = ({ lado }: { lado: 'front' | 'back' }) => {
    const brandParts = TAXI_INFO.brandName.split(' ');
    const brandFirst = brandParts[0].toUpperCase();
    const brandRest = brandParts.slice(1).join(' ').toUpperCase();

    return (
      <div className="w-[340px] h-[220px] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] border border-wine-500/30 rounded-xl overflow-hidden flex flex-col justify-between p-5 relative shadow-2xl select-none text-left">
        {/* Camino de Carretera decorativo color vino */}
        <svg className="absolute -top-4 -right-4 text-wine-500/5 text-7xl rotate-12 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 L60 110" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <circle cx="60" cy="30" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="60" cy="45" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="60" cy="75" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="60" cy="90" r="4" fill="currentColor" opacity="0.6" />
        </svg>
        <svg className="absolute -bottom-4 -left-4 text-wine-500/5 text-7xl -rotate-12 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="relative w-18 h-18 rounded-full p-0.5 bg-gradient-to-br from-wine-500 to-wine-600 flex-shrink-0 shadow-[0_0_15px_rgba(158,28,59,0.3)]">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-wine-500/40 bg-black">
                  <Image src="/foto_perfil.jpeg" alt={TAXI_INFO.brandName} fill className="object-cover" unoptimized priority />
                </div>
                <VerifiedIcon className="absolute -bottom-0.5 -right-0.5 text-wine-300 text-lg bg-black rounded-full" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg font-black text-white tracking-[0.15em] leading-none uppercase">
                  {brandFirst} <span className="text-wine-400 drop-shadow-[0_0_8px_rgba(158,28,59,0.5)]">{brandRest}</span>
                </h1>
                <p className="text-wine-200/80 text-[8px] font-black uppercase tracking-[0.25em] mt-1.5 flex items-center gap-1.5">
                  {TAXI_INFO.tagline}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-wine-500/40 to-transparent my-1"></div>

            <div className="flex flex-col gap-2 relative z-10 w-full pl-1 mb-1">
               <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-wine-500/10 flex items-center justify-center border border-wine-500/20">
                    <FaPhoneAlt className="text-wine-400" size={9} />
                  </div>
                  <span className="text-xs font-black text-white tracking-[0.2em]">{TAXI_INFO.phone.display}</span>
               </div>
               <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-wine-500/10 flex items-center justify-center border border-wine-500/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-wine-400"><path d="M12 2L15.09 8.26h6.79l-5.5 4L16.91 19 12 15l-4.91 4 1.63-6.74l-5.5-4h6.79z"/></svg>
                  </div>
                  <span className="text-xs font-bold text-wine-200/90 tracking-[0.15em]">Pide tu viaje por WhatsApp</span>
               </div>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between gap-3 relative z-10 h-full">
             <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden border border-wine-500/30 bg-white p-1.5 flex-shrink-0 shadow-[0_0_15px_rgba(158,28,59,0.15)]">
                <Image src="/qr.jpeg" alt={`QR ${TAXI_INFO.brandName}`} fill className="object-contain" unoptimized />
             </div>

             <div className="flex flex-col items-center flex-grow text-center justify-center h-full">
                <h2 className="text-[9px] font-black text-wine-400 tracking-[0.25em] uppercase mb-1">Pago Directo</h2>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-wine-500/20 to-transparent mb-2"></div>

                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="flex items-center gap-1.5 text-wine-200/70">
                    <BankIcon size={11} className="text-yellow-400" />
                    <span className="text-[9px] font-extrabold tracking-[0.15em] text-yellow-400 uppercase">{TAXI_INFO.bank.name.toUpperCase()}</span>
                  </div>
                  <div className="bg-black/40 border border-wine-500/30 px-2 py-1 rounded w-full">
                    <span className="text-[10px] font-mono font-black text-white tracking-wider block">
                      {TAXI_INFO.bank.clabe}
                    </span>
                  </div>
                  <span className="text-[8px] font-black text-wine-100 tracking-wider uppercase mt-0.5">
                    {TAXI_INFO.driverName}
                  </span>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-[#0a0a0a] relative overflow-x-hidden">
      <div className="text-center mb-6 select-none z-10">
        <p className="text-xs font-bold text-wine-400/80 uppercase tracking-widest mb-1">Tarjeta Digital Interactiva</p>
        <p className="text-[11px] text-zinc-500">Toca o desliza la tarjeta para ver el reverso</p>
      </div>

      {/* VISTA WEB INTERACTIVA */}
      <div className="flex flex-col items-center w-full z-10">
        <div
          className="w-[340px] h-[220px] relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-500/50 rounded-xl"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={`Tarjeta de contacto de ${TAXI_INFO.brandName}. Presiona para voltear.`}
          aria-expanded={isFlipped}
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

      {/* CONTENEDOR OCULTO PARA EXPORTACIÓN */}
      <div className="absolute left-[-9999px] top-0 flex flex-col gap-4 z-0">
        <div ref={frenteExportRef}>
          <ContenidoTarjeta lado="front" />
        </div>
        <div ref={reversoExportRef}>
          <ContenidoTarjeta lado="back" />
        </div>
      </div>

      {/* BOTONES DE EXPORTACIÓN */}
      <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-xs z-10">
        <div className="flex gap-2 w-full">
          <button
            onClick={exportarPNG}
            disabled={isExporting}
            className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-wine-600 to-wine-400 text-white text-xs font-bold flex items-center justify-center gap-2 hover:from-wine-500 hover:to-wine-300 transition-all shadow-[0_0_15px_rgba(158,28,59,0.3)] active:scale-95 disabled:opacity-50"
          >
            <FaImage size={14} />
            {isExporting ? 'Procesando...' : 'Descargar Imagen'}
          </button>

          <button
            onClick={exportarPDF}
            disabled={isExporting}
            className="flex-1 px-4 py-3.5 rounded-xl bg-[#121212] border border-wine-500/50 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-wine-500/10 transition-all active:scale-95 disabled:opacity-50"
          >
            <FaFilePdf size={14} className="text-wine-400" />
            {isExporting ? 'Procesando...' : 'Descargar PDF'}
          </button>
        </div>

        {onClose && (
          <button onClick={onClose} className="text-wine-300/50 text-xs flex items-center gap-2 hover:text-wine-300 transition-colors mt-3">
            <FaArrowLeft /> Volver al menú
          </button>
        )}
      </div>

      {/* Notificaciones Toasts */}
      {feedbackMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a]/90 border border-wine-500/30 text-white text-xs font-semibold py-3 px-6 rounded-full shadow-[0_0_25px_rgba(158,28,59,0.35)] backdrop-blur-md flex items-center gap-2 animate-slide-up">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          <span>{feedbackMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-950/90 border border-red-500/40 text-red-200 text-xs font-semibold py-3 px-6 rounded-full shadow-[0_0_25px_rgba(239,68,68,0.35)] backdrop-blur-md flex items-center gap-2 animate-slide-up">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
