"use client";

/* ==========================================================================
   Faq · preguntas frecuentes de la portada
   --------------------------------------------------------------------------
   Acordeón accesible, a todo el ancho de la columna de lectura. Cada pregunta
   es un botón con aria-expanded; el panel abre con una transición de altura y
   solo hay uno abierto a la vez.

   Motivo de la animación: cambio de estado. Sin ella el contenido aparecería
   de golpe y costaría entender qué se abrió.
   ========================================================================== */

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/content/site";

export default function Faq() {
  const [abierto, setAbierto] = useState(0);

  return (
    <section
      className="border-t border-linea bg-superficie py-20 lg:py-28"
      aria-labelledby="faq-titulo"
    >
      <div className="contenedor">
        <Reveal className="max-w-2xl">
          <h2 id="faq-titulo" className="text-[1.9rem] leading-[1.12] sm:text-[2.3rem]">
            {faq.titulo}
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-tinta-2">
            Si tu consulta no aparece aquí, escríbenos por WhatsApp o completa
            el formulario de contacto. Respondemos dentro del día hábil.
          </p>
        </Reveal>

        <ul className="mt-12 border-t border-linea">
          {faq.items.map((item, i) => {
            const activo = abierto === i;

            return (
              <Reveal
                as="li"
                key={item.pregunta}
                delay={i * 45}
                className="border-b border-linea"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierto(activo ? -1 : i)}
                    aria-expanded={activo}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-boton-${i}`}
                    className="group grid w-full grid-cols-[1fr_auto] items-start gap-6 py-6 text-left lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)_auto] lg:gap-10"
                  >
                    <span
                      className={`text-[1.05rem] leading-snug font-semibold transition-colors duration-300 sm:text-[1.15rem] ${
                        activo ? "text-acento" : "text-tinta group-hover:text-enlace"
                      }`}
                    >
                      {item.pregunta}
                    </span>

                    {/* Adelanto de la respuesta en pantallas anchas: ayuda a
                        decidir si vale la pena abrir. */}
                    <span
                      aria-hidden="true"
                      className={`hidden text-[0.92rem] leading-snug text-tinta-3 transition-opacity duration-300 lg:block ${
                        activo ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {item.respuesta.split(". ")[0]}.
                    </span>

                    <span
                      className={`mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center border transition-[transform,background-color,border-color,color] duration-300 ${
                        activo
                          ? "rotate-180 border-tinta bg-tinta text-superficie"
                          : "border-linea-fuerte text-tinta group-hover:border-enlace group-hover:text-enlace"
                      }`}
                    >
                      <Icon name="chevron" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-boton-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-marca ${
                    activo ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pr-12 pb-8 text-[0.98rem] leading-relaxed text-tinta-2">
                      {item.respuesta}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
