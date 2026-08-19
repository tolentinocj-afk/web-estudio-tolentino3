"use client";

/* ==========================================================================
   ServicioFaq · preguntas propias de cada línea de práctica
   --------------------------------------------------------------------------
   Distinto del acordeón de la portada: aquí las preguntas son de la materia
   concreta. Se muestran abiertas al cargar porque son dos o tres y son
   justamente lo que el visitante vino a leer: esconderlas detrás de un clic
   solo agrega fricción. El acordeón queda disponible para plegar lo leído.
   ========================================================================== */

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function ServicioFaq({ preguntas }) {
  const [abiertas, setAbiertas] = useState(() => preguntas.map((_, i) => i));

  const alternar = (i) =>
    setAbiertas((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <section
      className="border-t border-linea bg-superficie py-16 lg:py-20"
      aria-labelledby="faq-servicio-titulo"
    >
      <div className="contenedor grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <h2
            id="faq-servicio-titulo"
            className="text-[1.6rem] leading-snug sm:text-[1.9rem]"
          >
            Lo que suelen preguntarnos sobre esta materia
          </h2>
          <div className="mt-6 h-0.5 w-12 bg-acento" aria-hidden="true" />
        </Reveal>

        <div className="lg:col-span-8">
          <ul className="border-t border-linea">
            {preguntas.map((q, i) => {
              const activa = abiertas.includes(i);

              return (
                <Reveal
                  as="li"
                  key={q.p}
                  delay={i * 70}
                  className="border-b border-linea"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => alternar(i)}
                      aria-expanded={activa}
                      aria-controls={`servicio-faq-panel-${i}`}
                      id={`servicio-faq-boton-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-[1.05rem] leading-snug font-semibold transition-colors duration-300 ${
                          activa
                            ? "text-tinta"
                            : "text-tinta group-hover:text-enlace"
                        }`}
                      >
                        {q.p}
                      </span>
                      <span
                        className={`mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center border transition-[transform,border-color,color] duration-300 ${
                          activa
                            ? "rotate-180 border-acento text-acento"
                            : "border-linea-fuerte text-tinta group-hover:border-enlace group-hover:text-enlace"
                        }`}
                      >
                        <Icon name="chevron" className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`servicio-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`servicio-faq-boton-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-marca ${
                      activa
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pr-10 pb-6 text-[0.97rem] leading-relaxed text-tinta-2">
                        {q.r}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
