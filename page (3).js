/* ==========================================================================
   /recursos · listado de artículos y alertas normativas
   --------------------------------------------------------------------------
   Los artículos se leen de content/recursos/*.md durante la compilación. Para
   publicar uno nuevo basta con crear el archivo .md y volver a desplegar.
   ========================================================================== */

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { listarArticulos } from "@/lib/recursos";
import { firm } from "@/content/site";

export const metadata = {
  title: "Recursos",
  description:
    "Artículos y alertas normativas en materia tributaria, contable, laboral y societaria del Estudio Tolentino & Asociados.",
  alternates: { canonical: "/recursos" },
};

export default function Recursos() {
  const articulos = listarArticulos();
  const [principal, ...resto] = articulos;

  return (
    <>
      <PageHeader
        antetitulo="Publicaciones"
        titulo="Recursos y alertas normativas"
        bajada="Análisis breves sobre cambios normativos, criterios de la administración y buenas prácticas de cumplimiento, escritos para quien tiene que tomar la decisión."
        migas={[{ etiqueta: "Recursos" }]}
      />

      <section className="bg-superficie py-16 lg:py-24">
        <div className="contenedor">
          {articulos.length === 0 ? (
            <p className="max-w-xl border-l-2 border-acento pl-8 text-[1.02rem] leading-relaxed text-tinta-2">
              Estamos preparando las primeras publicaciones. Vuelve pronto o
              escríbenos si hay un tema que te interese que abordemos.
            </p>
          ) : (
            <>
              {/* --- Artículo destacado ------------------------------------ */}
              <Reveal>
                <Link
                  href={`/recursos/${principal.slug}`}
                  className="group grid gap-8 border border-linea p-8 transition-colors duration-300 hover:border-enlace/50 hover:bg-superficie-2 lg:grid-cols-12 lg:gap-12 lg:p-12"
                >
                  <div className="lg:col-span-3">
                    <span className="inline-block bg-tinta px-3 py-1.5 text-[0.66rem] font-semibold tracking-[0.12em] text-superficie uppercase">
                      {principal.categoria}
                    </span>
                    <p className="cifra mt-5 text-[0.82rem] text-tinta-3">
                      {principal.fechaLegible}
                    </p>
                    {principal.lectura && (
                      <p className="cifra mt-1 text-[0.82rem] text-tinta-3">
                        {principal.lectura} min de lectura
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-9">
                    <h2 className="text-[1.5rem] leading-snug transition-colors group-hover:text-enlace sm:text-[1.9rem]">
                      {principal.titulo}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-tinta-2">
                      {principal.resumen}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] text-acento uppercase">
                      Leer artículo
                      <Icon
                        name="flecha"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {/* --- Resto de artículos ------------------------------------ */}
              {resto.length > 0 && (
                <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {resto.map((a, i) => (
                    <Reveal as="li" key={a.slug} delay={i * 80}>
                      <Link
                        href={`/recursos/${a.slug}`}
                        className="group flex h-full flex-col border border-linea p-8 transition-colors duration-300 hover:border-enlace/50 hover:bg-superficie-2"
                      >
                        <p className="text-[0.66rem] font-semibold tracking-[0.12em] text-acento uppercase">
                          {a.categoria}
                        </p>
                        <h2 className="mt-4 text-[1.15rem] leading-snug transition-colors group-hover:text-enlace">
                          {a.titulo}
                        </h2>
                        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-tinta-3">
                          {a.resumen}
                        </p>
                        <p className="cifra mt-6 text-[0.8rem] text-tinta-3">
                          {a.fechaLegible}
                          {a.lectura ? ` · ${a.lectura} min` : ""}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* --- Invitación a consultar el caso concreto ------------------ */}
          <Reveal className="mt-14">
            <div className="flex flex-col gap-6 border border-acento/35 bg-acento-tenue px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div className="max-w-xl">
                <h2 className="text-[1.3rem] leading-snug">
                  ¿Quieres que revisemos tu caso concreto?
                </h2>
                <p className="mt-2.5 text-[0.97rem] leading-relaxed text-tinta-2">
                  Los artículos son generales por definición. Si tu situación
                  necesita una lectura particular, escríbenos: el primer
                  contacto no tiene costo.
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
    </>
  );
}
