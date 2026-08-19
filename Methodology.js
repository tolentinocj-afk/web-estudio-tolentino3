/* ==========================================================================
   Methodology · las cuatro etapas del encargo
   --------------------------------------------------------------------------
   Fotografía a un lado y secuencia vertical al otro. La línea que une las
   etapas es el propio recurso gráfico: no hacen falta tarjetas para que se
   entienda que una cosa va después de la otra.
   ========================================================================== */

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { imagenes, metodologia } from "@/content/site";

export default function Methodology() {
  const foto = imagenes.metodologia;

  return (
    <section
      className="border-t border-linea bg-superficie-2 py-20 lg:py-28"
      aria-labelledby="metodologia-titulo"
    >
      <div className="contenedor">
        <Reveal className="max-w-3xl">
          <h2
            id="metodologia-titulo"
            className="text-[1.9rem] leading-[1.12] sm:text-[2.3rem]"
          >
            {metodologia.titulo}
          </h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-tinta-2">
            {metodologia.bajada}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Fotografía --------------------------------------------- */}
          {foto?.src && (
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-superficie-3 lg:sticky lg:top-28 lg:aspect-[4/5]">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={82}
                  className="object-cover"
                  style={{ objectPosition: foto.posicion || "center" }}
                />
              </div>
            </Reveal>
          )}

          {/* --- Etapas -------------------------------------------------- */}
          <ol
            className={`relative ${foto?.src ? "lg:col-span-7" : "lg:col-span-12"}`}
          >
            {metodologia.pasos.map((paso, i) => (
              <Reveal
                as="li"
                key={paso.numero}
                delay={i * 110}
                className="relative pb-10 pl-14 last:pb-0"
              >
                {/* Línea de continuidad entre etapas */}
                {i < metodologia.pasos.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-11 bottom-0 left-[1.4rem] w-px bg-linea-fuerte"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="cifra absolute top-0 left-0 inline-flex h-11 w-11 items-center justify-center border border-linea-fuerte bg-superficie text-[0.8rem] font-semibold text-acento"
                >
                  {paso.numero}
                </span>

                <h3 className="pt-2 text-[1.3rem] leading-snug">
                  {paso.titulo}
                </h3>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-tinta-2">
                  {paso.texto}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
