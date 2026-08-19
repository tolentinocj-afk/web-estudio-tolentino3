/* ==========================================================================
   Services · las once líneas de práctica, agrupadas por materia
   --------------------------------------------------------------------------
   Once tarjetas iguales en fila obligan a leerlas todas para descartar diez.
   Agrupadas en cuatro familias, el visitante encuentra la suya de un vistazo
   y entra directo a la página del servicio.

   Las direcciones no cambian: cada servicio conserva su /servicios/[slug].
   ========================================================================== */

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { firm, hero, serviciosAgrupados, servicios } from "@/content/site";

export default function Services() {
  const grupos = serviciosAgrupados();

  return (
    <section
      id="servicios"
      className="scroll-mt-24 bg-superficie py-20 lg:py-28"
      aria-labelledby="servicios-titulo"
    >
      <div className="contenedor">
        {/* --- Entrada ----------------------------------------------------- */}
        <Reveal className="max-w-3xl">
          <p className="antetitulo">Líneas de práctica</p>
          <h2
            id="servicios-titulo"
            className="mt-5 text-[1.9rem] leading-[1.12] sm:text-[2.4rem] lg:text-[2.7rem]"
          >
            Servicios legales, contables y financieros bajo un mismo criterio
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-tinta-2">
            {hero.descripcion}
          </p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-tinta-3">
            Son {servicios.length} líneas que se articulan entre sí. Un mismo
            equipo revisa el expediente desde lo legal, lo contable y lo
            financiero, de modo que la solución no genere una contingencia en
            otro frente.
          </p>
        </Reveal>

        {/* --- Familias de materias ---------------------------------------- */}
        <ul className="mt-14 grid gap-px border border-linea bg-linea md:grid-cols-2">
          {grupos.map((g, i) => (
            <Reveal
              as="li"
              key={g.id}
              delay={i * 90}
              className="relative overflow-hidden bg-superficie p-8 lg:p-10"
            >
              {/* Ícono de la familia, en gran tamaño y muy tenue: da materia
                  al bloque sin competir con el texto. */}
              <Icon
                name={g.icono}
                className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 text-tinta opacity-[0.045]"
              />

              <div className="relative">
                <h3 className="text-[1.35rem] leading-snug">{g.titulo}</h3>
                <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-tinta-3">
                  {g.descripcion}
                </p>

                <ul className="mt-7 space-y-px">
                  {g.items.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="group flex items-start gap-4 py-3.5 transition-colors"
                      >
                        <Icon
                          name={s.icono}
                          className="mt-0.5 h-5 w-5 flex-none text-acento"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-tinta transition-colors group-hover:text-enlace">
                            {s.titulo}
                          </span>
                          <span className="mt-1 block text-[0.88rem] leading-snug text-tinta-3">
                            {s.resumen}
                          </span>
                        </span>
                        <Icon
                          name="flecha"
                          className="mt-1 h-4 w-4 flex-none text-linea-fuerte transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-enlace"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* --- Para quien no se reconoce en ninguna materia ----------------- */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-6 border border-acento/35 bg-acento-tenue px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <div className="max-w-xl">
              <h3 className="text-[1.25rem] leading-snug">
                ¿Tu caso no encaja en ninguna?
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-tinta-2">
                Escríbenos y te decimos en la misma conversación si podemos
                ayudarte. El primer contacto no tiene costo.
              </p>
            </div>
            <a
              href={`https://wa.me/${firm.whatsapp.numero}?text=${encodeURIComponent(
                firm.whatsapp.mensajeBase,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-none items-center justify-center gap-2.5 bg-tinta px-7 py-4 text-[0.78rem] font-semibold tracking-[0.1em] text-superficie uppercase transition-colors duration-300 hover:bg-enlace active:translate-y-px"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
