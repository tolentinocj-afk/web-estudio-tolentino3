"use client";

/* ==========================================================================
   WhatsAppFloat · botón flotante de WhatsApp
   --------------------------------------------------------------------------
   Único elemento circular del sitio, y la excepción está documentada: es la
   forma que cualquiera reconoce como botón de acción flotante.

   Aparece una vez, con un retardo corto para no competir con la carga de la
   apertura, y después se queda quieto. Sin anillos que laten en bucle.

   En las páginas internas de servicio el mensaje llega prellenado con la
   materia correspondiente, sin configurar nada por página.
   ========================================================================== */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { firm, servicios } from "@/content/site";

export default function WhatsAppFloat({ mensaje }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const slug = pathname?.startsWith("/servicios/")
    ? pathname.split("/")[2]
    : null;
  const servicio = slug ? servicios.find((s) => s.slug === slug) : null;
  const mensajeFinal = mensaje || servicio?.whatsapp;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const texto = mensajeFinal
    ? `Hola, escribo desde la web de ${firm.nombreCorto}. ${mensajeFinal}`
    : firm.whatsapp.mensajeBase;

  const url = `https://wa.me/${firm.whatsapp.numero}?text=${encodeURIComponent(texto)}`;

  /* z-40 lo deja por debajo de la barra superior, de modo que el menú móvil a
     pantalla completa lo cubra al abrirse. */
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir al estudio por WhatsApp"
      className={`group fixed right-5 bottom-5 z-40 inline-flex items-center gap-3 transition-[opacity,transform] duration-500 ease-marca sm:right-7 sm:bottom-7 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <span className="pointer-events-none hidden max-w-0 overflow-hidden rounded-full bg-invertido py-2.5 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:px-5 group-hover:opacity-100 lg:block">
        Escríbenos por WhatsApp
      </span>

      <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_12px_32px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <Icon name="whatsapp" className="h-7 w-7" strokeWidth="1.6" />
      </span>
    </a>
  );
}
