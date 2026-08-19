/* ==========================================================================
   /servicios · índice de líneas de práctica
   --------------------------------------------------------------------------
   Las once materias, agrupadas en cuatro familias. Cada familia ocupa una
   franja con su título a la izquierda y sus servicios a la derecha, de modo
   que se pueda barrer la página buscando la propia sin leerlo todo.
   ========================================================================== */

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { serviciosAgrupados, servicios, firm } from "@/content/site";

export const metadata = {
  title: "Servicios",
  description:
    "Asesoría tributaria, devolución de impuestos, drawback, disolución y liquidación de empresas, contabilidad, finanzas, laboral y legal corporativa, civil y penal.",
  alternates: { canonical: "/servicios" },
};

export default function Servicios() {
  const grupos = serviciosAgrupados();

  return (
    <>
      <PageHeader
        antetitulo="Líneas de práctica"
        titulo="Servicios legales, contables y financieros"
        bajada={`Son ${servicios.length} líneas de práctica que se articulan entre sí. Elige la materia de tu consulta para conocer el alcance del servicio.`}
        migas={[{ etiqueta: "Servicios" }]}
      />

      <div className="bg-superficie">
        {grupos.map((g, gi) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`grupo-${g.id}`}
            className={`scroll-mt-24 py-16 lg:py-20 ${
              gi % 2 === 1 ? "bg-superficie-2" : "bg-superficie"
            } ${gi > 0 ? "border-t border-linea" : ""}`}
          >
            <div className="contenedor grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Icon name={g.icono} className="h-9 w-9 text-acento" />
                  <h2
                    id={`grupo-${g.id}`}
                    className="mt-5 text-[1.6rem] leading-snug"
                  >
                    {g.titulo}
                  </h2>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-tinta-2">
                    {g.descripcion}
                  </p>
                </div>
              </Reveal>

              <ul className="lg:col-span-8">
                {g.items.map((s, i) => (
                  <Reveal
                    as="li"
                    key={s.slug}
                    delay={i * 80}
                    className="border-t border-linea first:border-t-0 lg:first:border-t"
                  >
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="group flex items-start gap-5 py-7"
                    >
                      <Icon
                        name={s.icono}
                        className="mt-1 h-6 w-6 flex-none text-acento"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1.15rem] font-semibold text-tinta transition-colors group-hover:text-enlace">
                          {s.titulo}
                        </span>
                        <span className="mt-2 block max-w-xl text-[0.95rem] leading-relaxed text-tinta-2">
                          {s.resumen}
                        </span>
                      </span>
                      <Icon
                        name="flecha"
                        className="mt-2 h-5 w-5 flex-none text-linea-fuerte transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-enlace"
                      />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* --- Materia no listada --------------------------------------- */}
        <section className="border-t border-linea bg-superficie py-16">
          <div className="contenedor">
            <Reveal className="flex flex-col gap-6 border border-acento/35 bg-acento-tenue px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div className="max-w-xl">
                <h2 className="text-[1.25rem] leading-snug">
                  ¿Tu caso no encaja en ninguna?
                </h2>
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
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
