/* ==========================================================================
   LegalPage · maqueta común de las páginas legales
   --------------------------------------------------------------------------
   Índice lateral fijo más el cuerpo del documento. Las secciones llegan como
   datos, así que el índice se genera solo y nunca se desincroniza del texto.
   ========================================================================== */

import Reveal from "@/components/ui/Reveal";

export default function LegalPage({ actualizado, intro, secciones }) {
  return (
    <section className="bg-superficie py-16 lg:py-24">
      <div className="contenedor grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Índice ------------------------------------------------------ */}
        <Reveal className="lg:col-span-3">
          <nav
            aria-label="Índice del documento"
            className="sticky top-28 border-t-2 border-acento pt-6"
          >
            <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-tinta uppercase">
              Contenido
            </p>
            <ol className="mt-5 space-y-2.5 text-[0.85rem] leading-snug">
              {secciones.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-tinta-3 transition-colors hover:text-enlace"
                  >
                    <span className="cifra mr-2 text-acento">{i + 1}.</span>
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ol>

            {actualizado && (
              <p className="mt-8 border-t border-linea pt-6 text-[0.78rem] leading-relaxed text-tinta-3">
                Última actualización:
                <br />
                {actualizado}
              </p>
            )}
          </nav>
        </Reveal>

        {/* --- Cuerpo ------------------------------------------------------ */}
        <Reveal delay={100} className="lg:col-span-9">
          <div className="max-w-3xl">
            {intro && (
              <p className="border-l-2 border-acento pl-6 text-[1.05rem] leading-relaxed text-tinta">
                {intro}
              </p>
            )}

            {secciones.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="mt-12 scroll-mt-28 border-t border-linea pt-8 first-of-type:border-t-0"
              >
                <h2 className="text-[1.4rem] leading-snug">
                  <span className="cifra mr-3 text-acento">{i + 1}.</span>
                  {s.titulo}
                </h2>

                <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-tinta-2">
                  {s.parrafos?.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}

                  {s.lista && (
                    <ul className="space-y-3 pl-0">
                      {s.lista.map((li, j) => (
                        <li key={j} className="relative pl-6">
                          <span
                            aria-hidden="true"
                            className="absolute top-[0.85em] left-0 h-px w-3 bg-acento"
                          />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.cierre?.map((p, j) => (
                    <p key={`c${j}`}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
