/* ==========================================================================
   PageHeader · encabezado de las páginas internas
   --------------------------------------------------------------------------
   Claro, como el resto del sitio. La jerarquía la da el tamaño del titular y
   el aire alrededor, no una banda oscura de tres pisos de alto.

   Si en content/site.js se configura imagenes.cabeceras, la fotografía se
   publica como franja ancha debajo del titular. Sin ella el encabezado se ve
   igual de terminado, solo que más sobrio.
   ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import { imagenes } from "@/content/site";

export default function PageHeader({
  antetitulo,
  titulo,
  bajada,
  migas = [],
  aside = null,
}) {
  const foto = imagenes.cabeceras?.src ? imagenes.cabeceras : null;

  return (
    <section className="border-b border-linea bg-superficie pt-28 lg:pt-32">
      <div className="contenedor pb-12 lg:pb-16">
        {migas.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] tracking-[0.06em] text-tinta-3 uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-enlace">
                  Inicio
                </Link>
              </li>
              {migas.map((m) => (
                <li key={m.etiqueta} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-linea-fuerte">
                    /
                  </span>
                  {m.href ? (
                    <Link
                      href={m.href}
                      className="transition-colors hover:text-enlace"
                    >
                      {m.etiqueta}
                    </Link>
                  ) : (
                    <span className="text-tinta-2">{m.etiqueta}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-8">
            {antetitulo && <p className="antetitulo">{antetitulo}</p>}

            <h1
              className={`max-w-4xl text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem] ${
                antetitulo ? "mt-5" : ""
              }`}
            >
              {titulo}
            </h1>

            {bajada && (
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-tinta-2">
                {bajada}
              </p>
            )}
          </div>

          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>

      {foto && (
        <div className="relative h-[26vh] max-h-72 min-h-40 w-full overflow-hidden">
          <Image
            src={foto.src}
            alt={foto.alt || ""}
            fill
            sizes="100vw"
            quality={82}
            className="object-cover"
            style={{ objectPosition: foto.posicion || "center" }}
          />
        </div>
      )}
    </section>
  );
}

/* --------------------------------------------------------------------------
   PageStub · contenido provisional de una sección aún no desarrollada
   -------------------------------------------------------------------------- */

export function PageStub({ nota }) {
  return (
    <section className="bg-superficie py-24 lg:py-28">
      <div className="contenedor">
        <div className="max-w-2xl border-l-2 border-acento pl-8">
          <p className="antetitulo">Sección en preparación</p>
          <p className="mt-4 text-base leading-relaxed text-tinta-2">{nota}</p>
          <Link
            href="/"
            className="enlace-linea mt-8 inline-flex text-[0.78rem] font-semibold tracking-[0.1em] text-tinta uppercase"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
