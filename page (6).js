/* ==========================================================================
   /servicios/[slug] · página interna de cada línea de práctica
   --------------------------------------------------------------------------
   Se genera a partir del listado de content/site.js. El orden de los bloques
   sigue el orden real de las dudas del visitante:

     1. ¿Esto es para mí?      → paraQuien
     2. ¿Qué es exactamente?   → detalle
     3. ¿Qué van a hacer?      → puntos
     4. ¿Qué me llevo?         → entregables
     5. ¿Qué necesitan de mí?  → documentos
     6. Dudas de esta materia  → preguntas
     7. Escribir               → formulario
     8. Servicios afines       → relacionados

   El botón flotante de WhatsApp lleva el mensaje prellenado del servicio,
   resuelto en components/layout/WhatsAppFloat.js.
   ========================================================================== */

import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import ServicioFaq from "@/components/servicios/ServicioFaq";
import { servicios, firm } from "@/content/site";

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = servicios.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.titulo,
    description: s.resumen,
    alternates: { canonical: `/servicios/${s.slug}` },
    openGraph: { title: s.titulo, description: s.resumen },
  };
}

export default async function Servicio({ params }) {
  const { slug } = await params;
  const servicio = servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  /* Servicios afines, elegidos a mano en content/site.js y no por posición */
  const otros = (servicio.relacionados || [])
    .map((r) => servicios.find((s) => s.slug === r))
    .filter(Boolean);

  const urlWhatsapp = `https://wa.me/${firm.whatsapp.numero}?text=${encodeURIComponent(
    `Hola, escribo desde la web de ${firm.nombreCorto}. ${servicio.whatsapp}`,
  )}`;

  /* Datos estructurados del servicio y de sus preguntas frecuentes: permiten
     que Google muestre las preguntas en el propio resultado de búsqueda. */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: servicio.titulo,
        description: servicio.detalle,
        serviceType: servicio.titulo,
        provider: { "@id": `${firm.dominio}/#organizacion` },
        areaServed: { "@type": "Country", name: "Perú" },
        url: `${firm.dominio}/servicios/${servicio.slug}`,
      },
      ...(servicio.preguntas?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: servicio.preguntas.map((q) => ({
                "@type": "Question",
                name: q.p,
                acceptedAnswer: { "@type": "Answer", text: q.r },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <PageHeader
        antetitulo="Línea de práctica"
        titulo={servicio.titulo}
        bajada={servicio.resumen}
        migas={[
          { etiqueta: "Servicios", href: "/servicios" },
          { etiqueta: servicio.titulo },
        ]}
      />

      {/* --- 1. ¿Esto es para mí? -----------------------------------------
          Va primero a propósito: quien se reconoce en una de estas
          situaciones ya sabe que está en el lugar correcto, y quien no se
          reconoce se ahorra la consulta. */}
      {servicio.paraQuien?.length > 0 && (
        <section className="bg-superficie-2 py-16 lg:py-20">
          <div className="contenedor">
            <Reveal>
              <h2 className="text-[1.7rem] leading-snug sm:text-[2rem]">
                Este servicio es para ti si
              </h2>
            </Reveal>

            <ul className="mt-9 grid gap-px border border-linea bg-linea lg:grid-cols-2">
              {servicio.paraQuien.map((caso, i) => (
                <Reveal
                  as="li"
                  key={caso}
                  delay={i * 70}
                  className="flex gap-4 bg-superficie px-6 py-6"
                >
                  <span className="cifra mt-0.5 text-[0.8rem] font-semibold text-acento">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.98rem] leading-relaxed text-tinta">
                    {caso}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --- 2 y 3. Alcance del servicio ---------------------------------- */}
      <section className="border-t border-linea bg-superficie py-16 lg:py-24">
        <div className="contenedor grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-[1.15rem] leading-relaxed text-tinta">
              {servicio.detalle}
            </p>

            <h2 className="mt-12 text-[1.6rem]">Qué incluye</h2>
            <div className="mt-5 h-0.5 w-12 bg-acento" aria-hidden="true" />

            {/* Dos columnas: una lista de diez viñetas seguidas se lee mal */}
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {servicio.puntos.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-tinta-2"
                >
                  <Icon
                    name="check"
                    className="mt-1.5 h-3.5 w-3.5 flex-none text-acento"
                  />
                  {p}
                </li>
              ))}
            </ul>

            {servicio.plazo && (
              <div className="mt-10 flex gap-4 border-l-2 border-acento bg-superficie-2 py-5 pr-6 pl-6">
                <Icon
                  name="reloj"
                  className="mt-0.5 h-5 w-5 flex-none text-acento"
                />
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-tinta uppercase">
                    Plazo de ejecución
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-tinta-2">
                    {servicio.plazo}
                  </p>
                </div>
              </div>
            )}

            {servicio.excluye && (
              <div className="mt-4 flex gap-4 border-l-2 border-linea-fuerte bg-superficie-2 py-5 pr-6 pl-6">
                <Icon
                  name="alerta"
                  className="mt-0.5 h-5 w-5 flex-none text-tinta-3"
                />
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-tinta uppercase">
                    No incluye
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-tinta-2">
                    {servicio.excluye}
                  </p>
                </div>
              </div>
            )}
          </Reveal>

          {/* --- Panel de contacto rápido -------------------------------- */}
          <Reveal delay={110} className="lg:col-span-5">
            <div className="sticky top-28 border border-linea border-t-2 border-t-acento bg-superficie-2 p-8 lg:p-9">
              <h2 className="text-[1.2rem] leading-snug">
                ¿Tu caso encaja en esta materia?
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-tinta-2">
                Escríbenos con los datos del expediente y el plazo que tienes.
                La primera conversación no tiene costo y sirve para saber si
                podemos ayudarte.
              </p>

              {servicio.precio && (
                <div className="mt-7 border border-linea bg-superficie px-6 py-5">
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-acento uppercase">
                    Honorarios
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-snug text-tinta">
                    {servicio.precio}
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-snug text-tinta-3">
                    Recibes la propuesta por escrito antes de que iniciemos.
                  </p>
                </div>
              )}

              <a
                href={urlWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex w-full items-center justify-center gap-3 bg-tinta px-6 py-4 text-[0.76rem] font-semibold tracking-[0.1em] text-superficie uppercase transition-colors duration-300 hover:bg-enlace active:translate-y-px"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                Escribir por WhatsApp
              </a>

              <ul className="mt-8 space-y-3.5 border-t border-linea pt-8 text-[0.93rem]">
                {firm.telefonos.map((t) => (
                  <li key={t.tel}>
                    <a
                      href={`tel:${t.tel}`}
                      className="cifra flex items-center gap-3 text-tinta transition-colors hover:text-enlace"
                    >
                      <Icon
                        name="telefono"
                        className="h-4 w-4 flex-none text-acento"
                      />
                      {t.etiqueta}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${firm.email}`}
                    className="flex items-center gap-3 break-all text-tinta transition-colors hover:text-enlace"
                  >
                    <Icon
                      name="correo"
                      className="h-4 w-4 flex-none text-acento"
                    />
                    {firm.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 4 y 5. Qué recibes y qué necesitamos de ti -------------------- */}
      {(servicio.entregables?.length > 0 || servicio.documentos?.length > 0) && (
        <section className="border-t border-linea bg-superficie-2 py-16 lg:py-20">
          {/* Dos columnas solo cuando hay dos bloques. Con uno solo, media
              página vacía se lee como un error de maqueta. */}
          <div
            className={`contenedor grid gap-12 lg:gap-16 ${
              servicio.entregables?.length > 0 && servicio.documentos?.length > 0
                ? "lg:grid-cols-2"
                : ""
            }`}
          >
            {servicio.entregables?.length > 0 && (
              <Reveal className="max-w-3xl">
                <h2 className="text-[1.5rem] leading-snug">
                  Entregables concretos, no promesas
                </h2>
                <ul className="mt-7 space-y-4">
                  {servicio.entregables.map((e) => (
                    <li
                      key={e}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-tinta-2"
                    >
                      <Icon
                        name="check"
                        className="mt-1.5 h-3.5 w-3.5 flex-none text-acento"
                      />
                      {e}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {servicio.documentos?.length > 0 && (
              <Reveal delay={110} className="max-w-3xl">
                <h2 className="text-[1.5rem] leading-snug">
                  Qué necesitamos de ti para empezar
                </h2>
                <ul className="mt-7 space-y-4">
                  {servicio.documentos.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-tinta-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-3 flex-none bg-acento"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-[0.88rem] leading-relaxed text-tinta-3">
                  Si no tienes todo, no es impedimento para escribir. Parte de
                  la primera conversación es justamente identificar qué falta.
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* --- 6. Preguntas propias de esta materia -------------------------- */}
      {servicio.preguntas?.length > 0 && (
        <ServicioFaq preguntas={servicio.preguntas} />
      )}

      {/* --- 7. Formulario ------------------------------------------------- */}
      <section className="border-t border-linea bg-superficie-2 py-16 lg:py-24">
        <div className="contenedor grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <h2 className="text-[1.8rem] leading-snug">Cuéntanos tu caso</h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-tinta-2">
              El formulario llega directamente al equipo a cargo de esta línea
              de práctica, con la materia ya seleccionada.
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <div className="bg-superficie p-8 lg:p-10">
              <ContactForm materiaPorDefecto={servicio.titulo} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 8. Servicios afines ------------------------------------------- */}
      {otros.length > 0 && (
        <section className="border-t border-linea bg-superficie py-16 lg:py-20">
          <div className="contenedor">
            <h2 className="text-[1.4rem]">También podría interesarte</h2>
            <ul className="mt-8 grid gap-px border border-linea bg-linea sm:grid-cols-3">
              {otros.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 80} className="bg-superficie">
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-superficie-2"
                  >
                    <Icon
                      name={s.icono}
                      className="h-7 w-7 text-acento"
                    />
                    <h3 className="mt-5 text-[1.05rem] leading-snug transition-colors group-hover:text-enlace">
                      {s.titulo}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-tinta-3">
                      {s.resumen}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] text-acento uppercase">
                      Ver servicio
                      <Icon
                        name="flecha"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
