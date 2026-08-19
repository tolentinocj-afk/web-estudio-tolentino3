/* ==========================================================================
   /nosotros · quiénes somos, misión, visión, valores y socio fundador
   ========================================================================== */

import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Founder from "@/components/home/Founder";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { nosotros, credibilidad, firm, imagenes } from "@/content/site";

export const metadata = {
  title: "Nosotros",
  description:
    "Estudio Tolentino & Asociados: firma peruana de abogados y contadores desde 2013. Misión, visión, valores institucionales y perfil del socio fundador.",
  alternates: { canonical: "/nosotros" },
};

export default function Nosotros() {
  return (
    <>
      <PageHeader
        antetitulo={nosotros.antetitulo}
        titulo={nosotros.titulo}
        bajada={nosotros.bajada}
        migas={[{ etiqueta: "Nosotros" }]}
      />

      {/* --- Quiénes somos ------------------------------------------------- */}
      <section className="bg-superficie py-20 lg:py-24">
        <div className="contenedor grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="text-[1.8rem] leading-snug">
              Una firma que no separa lo legal de lo contable
            </h2>
            <div className="mt-7 h-0.5 w-12 bg-acento" aria-hidden="true" />
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <div className="space-y-6 text-[1.05rem] leading-relaxed text-tinta-2">
              {nosotros.quienesSomos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-14 grid grid-cols-2 gap-y-10 border-t border-linea pt-12 sm:grid-cols-4">
              {credibilidad.map((c) => (
                <li key={c.etiqueta}>
                  <p className="cifra text-[2rem] leading-none font-semibold text-tinta">
                    <Counter
                      valor={c.valor}
                      sufijo={c.sufijo}
                      formato={c.formato}
                    />
                  </p>
                  <p className="mt-2.5 text-[0.68rem] font-semibold tracking-[0.12em] text-acento uppercase">
                    {c.etiqueta}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --- Banda fotográfica, solo si hay imagen configurada -------------- */}
      {imagenes.nosotros.src && (
        <section aria-hidden="true">
          <div className="relative h-[38vh] max-h-96 min-h-52 w-full overflow-hidden">
            <Image
              src={imagenes.nosotros.src}
              alt={imagenes.nosotros.alt}
              fill
              sizes="100vw"
              quality={82}
              className="object-cover"
              style={{ objectPosition: imagenes.nosotros.posicion || "center" }}
            />
          </div>
        </section>
      )}

      {/* --- Misión y visión ------------------------------------------------ */}
      <section className="border-t border-linea bg-superficie-2 py-16 lg:py-20">
        <div className="contenedor grid gap-px border border-linea bg-linea md:grid-cols-2">
          {[nosotros.mision, nosotros.vision].map((b, i) => (
            <Reveal
              key={b.titulo}
              delay={i * 110}
              className="bg-superficie p-8 lg:p-10"
            >
              <h2 className="text-[1.5rem]">{b.titulo}</h2>
              <div className="mt-5 h-0.5 w-12 bg-acento" aria-hidden="true" />
              <p className="mt-6 text-[1.02rem] leading-relaxed text-tinta-2">
                {b.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- Valores institucionales ---------------------------------------- */}
      <section
        className="border-t border-linea bg-superficie py-20 lg:py-24"
        aria-labelledby="valores-titulo"
      >
        <div className="contenedor">
          <Reveal className="max-w-2xl">
            <h2 id="valores-titulo" className="text-[1.9rem] leading-[1.12] sm:text-[2.2rem]">
              Siete criterios que ordenan cómo trabajamos
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {nosotros.valores.map((v, i) => (
              <Reveal as="li" key={v.titulo} delay={i * 60} className="flex gap-5">
                <span className="mt-0.5 inline-flex h-11 w-11 flex-none items-center justify-center border border-linea-fuerte bg-superficie-2 text-acento">
                  <Icon name={v.icono} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.05rem] leading-snug">{v.titulo}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-tinta-3">
                    {v.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Socio fundador -------------------------------------------------- */}
      <Founder conCta={false} />

      {/* --- Equipo y cierre -------------------------------------------------- */}
      <section className="border-t border-linea bg-superficie py-20 lg:py-24">
        <div className="contenedor">
          <Reveal className="max-w-2xl">
            <h2 className="text-[1.6rem]">{nosotros.equipo.titulo}</h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-tinta-2">
              {nosotros.equipo.texto}
            </p>
            <Button href="/contacto" variante="contorno" className="mt-8">
              Agendar consulta
              <Icon name="flecha" className="h-4 w-4" />
            </Button>
          </Reveal>

          <Reveal className="mt-16 flex flex-col gap-6 border border-acento/35 bg-acento-tenue px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p className="text-[1.25rem] font-semibold text-tinta">
              ¿Conversamos sobre tu caso?
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
              {firm.telefonos.map((t) => (
                <a
                  key={t.tel}
                  href={`tel:${t.tel}`}
                  className="cifra inline-flex items-center gap-3 text-tinta transition-colors hover:text-enlace"
                >
                  <Icon name="telefono" className="h-4 w-4 text-acento" />
                  {t.etiqueta}
                </a>
              ))}
              <a
                href={`mailto:${firm.email}`}
                className="inline-flex items-center gap-3 text-tinta transition-colors hover:text-enlace"
              >
                <Icon name="correo" className="h-4 w-4 text-acento" />
                {firm.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
