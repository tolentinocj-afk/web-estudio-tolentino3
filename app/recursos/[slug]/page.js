/* ==========================================================================
   /recursos/[slug] · página de artículo
   ========================================================================== */

import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { listarArticulos, obtenerArticulo } from "@/lib/recursos";
import { firm } from "@/content/site";

export function generateStaticParams() {
  return listarArticulos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await obtenerArticulo(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.resumen,
    alternates: { canonical: `/recursos/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.resumen,
      publishedTime: a.fecha,
      authors: [a.autor],
    },
  };
}

export default async function Articulo({ params }) {
  const { slug } = await params;
  const articulo = await obtenerArticulo(slug);
  if (!articulo) notFound();

  const relacionados = listarArticulos()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.titulo,
    description: articulo.resumen,
    datePublished: articulo.fecha,
    author: { "@type": "Person", name: articulo.autor },
    publisher: {
      "@type": "Organization",
      name: firm.razonSocial,
      url: firm.dominio,
    },
    mainEntityOfPage: `${firm.dominio}/recursos/${articulo.slug}`,
  };

  const ficha = [
    { etiqueta: "Publicado", valor: articulo.fechaLegible },
    { etiqueta: "Autor", valor: articulo.autor },
    { etiqueta: "Materia", valor: articulo.categoria },
    ...(articulo.lectura
      ? [{ etiqueta: "Lectura", valor: `${articulo.lectura} minutos` }]
      : []),
  ];

  return (
    <>
      <PageHeader
        antetitulo={articulo.categoria}
        titulo={articulo.titulo}
        bajada={articulo.resumen}
        migas={[
          { etiqueta: "Recursos", href: "/recursos" },
          { etiqueta: articulo.titulo },
        ]}
      />

      <article className="bg-superficie py-16 lg:py-24">
        <div className="contenedor grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Ficha lateral -------------------------------------------- */}
          <Reveal className="lg:col-span-3">
            <div className="sticky top-28 space-y-6 border-t-2 border-acento pt-6 text-[0.87rem] text-tinta-2">
              {ficha.map((f) => (
                <div key={f.etiqueta}>
                  <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-tinta uppercase">
                    {f.etiqueta}
                  </p>
                  <p className="mt-1.5">{f.valor}</p>
                </div>
              ))}

              <a
                href={`https://wa.me/${firm.whatsapp.numero}?text=${encodeURIComponent(
                  `Hola, leí el artículo "${articulo.titulo}" en la web de ${firm.nombreCorto} y quisiera consultar sobre mi caso.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 border border-linea-fuerte px-5 py-3.5 text-[0.72rem] font-semibold tracking-[0.1em] text-tinta uppercase transition-colors duration-300 hover:border-enlace hover:text-enlace"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
            </div>
          </Reveal>

          {/* --- Cuerpo del artículo --------------------------------------- */}
          <Reveal delay={100} className="lg:col-span-9">
            <div
              className="prosa max-w-3xl"
              dangerouslySetInnerHTML={{ __html: articulo.html }}
            />

            <Link
              href="/recursos"
              className="enlace-linea mt-14 text-[0.76rem] font-semibold tracking-[0.1em] text-tinta uppercase"
            >
              <Icon name="flecha" className="h-4 w-4 rotate-180" />
              Volver a Recursos
            </Link>
          </Reveal>
        </div>
      </article>

      {/* --- Otros artículos ---------------------------------------------- */}
      {relacionados.length > 0 && (
        <section className="border-t border-linea bg-superficie-2 py-16 lg:py-20">
          <div className="contenedor">
            <h2 className="text-[1.4rem]">Seguir leyendo</h2>
            <ul className="mt-8 grid gap-px border border-linea bg-linea md:grid-cols-3">
              {relacionados.map((a, i) => (
                <Reveal
                  as="li"
                  key={a.slug}
                  delay={i * 80}
                  className="bg-superficie"
                >
                  <Link
                    href={`/recursos/${a.slug}`}
                    className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-superficie-2"
                  >
                    <p className="text-[0.66rem] font-semibold tracking-[0.12em] text-acento uppercase">
                      {a.categoria}
                    </p>
                    <h3 className="mt-4 flex-1 text-[1.05rem] leading-snug transition-colors group-hover:text-enlace">
                      {a.titulo}
                    </h3>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.1em] text-acento uppercase">
                      Leer
                      <Icon
                        name="flecha"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
