/* ==========================================================================
   Founder · perfil del socio fundador
   --------------------------------------------------------------------------
   Se usa en la portada y en la página Nosotros. Cada una pasa el encuadre que
   le conviene: cuadrado en la portada, donde la apertura ya muestra el retrato
   vertical, y retrato completo en Nosotros.

   Si algún día no hubiera fotografía, el bloque se sostiene con el monograma
   de iniciales sobre la superficie marcada.
   ========================================================================== */

import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { fundador } from "@/content/site";

export default function Founder({
  foto = fundador.foto,
  proporcion = "aspect-[4/5]",
  conCta = true,
}) {
  return (
    <section
      className="border-t border-linea bg-superficie-2 py-20 lg:py-28"
      aria-labelledby="fundador-titulo"
    >
      <div className="contenedor grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Retrato ------------------------------------------------------ */}
        <Reveal className="lg:col-span-5">
          <div className="relative w-full">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -left-4 hidden h-full w-full border border-acento/45 sm:block"
            />

            <div
              className={`relative ${proporcion} w-full overflow-hidden bg-superficie-3`}
            >
              {foto ? (
                <Image
                  src={foto}
                  alt={fundador.fotoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={84}
                  className="object-cover object-top"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-4"
                  role="img"
                  aria-label={fundador.fotoAlt}
                >
                  <span className="text-6xl font-semibold tracking-[-0.04em] text-tinta">
                    {fundador.iniciales}
                  </span>
                  <span className="h-px w-14 bg-acento" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {fundador.colegiaturas.map((c) => (
              <li
                key={c}
                className="cifra border border-linea-fuerte px-4 py-2 text-[0.72rem] font-semibold tracking-[0.08em] text-tinta uppercase"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* --- Perfil -------------------------------------------------------- */}
        <Reveal delay={110} className="lg:col-span-7">
          <h2
            id="fundador-titulo"
            className="text-[1.9rem] leading-[1.12] sm:text-[2.2rem]"
          >
            {fundador.nombre}
          </h2>
          <p className="mt-3 text-[0.78rem] font-semibold tracking-[0.12em] text-acento uppercase">
            {fundador.cargo}
          </p>

          <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-tinta-2">
            {fundador.perfil.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-10 border-t border-linea pt-10 sm:grid-cols-2">
            <div>
              <h3 className="text-[0.72rem] font-semibold tracking-[0.14em] text-tinta uppercase">
                Formación
              </h3>
              <ul className="mt-4 space-y-3">
                {fundador.formacion.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-[0.9rem] leading-snug text-tinta-2"
                  >
                    <Icon
                      name="check"
                      className="mt-1 h-3.5 w-3.5 flex-none text-acento"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[0.72rem] font-semibold tracking-[0.14em] text-tinta uppercase">
                Certificaciones
              </h3>
              <ul className="mt-4 space-y-3">
                {fundador.certificaciones.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-[0.9rem] leading-snug text-tinta-2"
                  >
                    <Icon
                      name="check"
                      className="mt-1 h-3.5 w-3.5 flex-none text-acento"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {conCta && (
            <Button href={fundador.cta.href} variante="contorno" className="mt-10">
              {fundador.cta.etiqueta}
              <Icon name="flecha" className="h-4 w-4" />
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
