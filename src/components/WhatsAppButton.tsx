export default function WhatsAppButton() {
  // Número de WhatsApp con el código de país (52 para México)
  const numeroWhatsApp = "525632543475";
  const mensaje = "Hola Manrrique, me gustaría solicitar un viaje por favor.";

  return (
    <div className="w-full">
      <a
        href={`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] hover:scale-105 overflow-hidden"
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
