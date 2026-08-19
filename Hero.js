/* ==========================================================================
   Hero · bloque de apertura
   --------------------------------------------------------------------------
   Composición asimétrica: el mensaje ocupa siete columnas a la izquierda y el
   retrato del socio fundador las cinco de la derecha. En un estudio de este
   tamaño el visitante quiere saber con quién va a hablar, y una fotografía
   real vale más que cualquier ilustración.

   Cuatro elementos de texto y ninguno más: antetítulo, titular, bajada y los
   dos botones. Todo cabe en la primera pantalla, que es justamente lo que
   tiene que pasar para que el botón se vea sin desplazar.

   El bloque se centra con "my-auto" y no con "items-center": así, cuando el
   contenido es más alto que la pantalla, crece hacia abajo en lugar de meterse
   debajo de la barra superior.

   El movimiento es una cascada de entrada con retardos escalonados: marca la
   jerarquía de lectura. No hay parallax ni nada que siga al cursor.
   ========================================================================== */

import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import FondoImagen from "@/components/ui/FondoImagen";
import { fundador, hero, imagenes } from "@/content/site";

export default function Hero() {
  const conFondo = Boolean(imagenes.hero.src);

  return (
    <section
      className="marca-agua relative flex min-h-[100dvh] flex-col overflow-hidden bg-superficie pt-28 pb-14 lg:pt-24 lg:pb-20"
      aria-labelledby="hero-titulo"
    >
      {/* Fondo opcional. Sin fotografía, el monograma de la marca hace de
          marca de agua, tal como en la hoja membretada. */}
      {conFondo ? (
        <FondoImagen imagen={imagenes.hero} intensidad="suave" prioridad />
      ) : (
        <span aria-hidden="true" />
      )}

      <div className="contenedor relative z-10 my-auto w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Mensaje --------------------------------------------------- */}
          <div className="lg:col-span-7">
            <p className="antetitulo anim-entra [animation-delay:80ms]">
              {hero.antetitulo}
            </p>

            <h1
              id="hero-titulo"
              className="anim-arriba mt-6 text-[2.1rem] leading-[1.06] tracking-[-0.03em] [animation-delay:180ms] sm:text-[2.7rem] lg:text-[3.2rem]"
            >
              {hero.titular}
            </h1>

            <div
              aria-hidden="true"
              className="anim-crece mt-8 h-px w-24 bg-acento [animation-delay:520ms]"
            />

            <p className="anim-arriba mt-8 max-w-xl text-[1.05rem] leading-relaxed text-tinta-2 [animation-delay:300ms]">
              {hero.subtitulo}
            </p>

            <div className="anim-arriba mt-10 flex flex-col gap-3 [animation-delay:420ms] sm:flex-row sm:items-center sm:gap-4">
              <Button href={hero.ctaPrimario.href} variante="solido">
                {hero.ctaPrimario.etiqueta}
                <Icon name="flecha" className="h-4 w-4" />
              </Button>
              <Button href={hero.ctaSecundario.href} variante="contorno">
                {hero.ctaSecundario.etiqueta}
              </Button>
            </div>
          </div>

          {/* --- Retrato ---------------------------------------------------- */}
          <div className="anim-entra lg:col-span-5 [animation-delay:340ms]">
            <div className="relative">
              {/* Marco desplazado: recurso gráfico heredado de la identidad */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 -right-4 hidden h-full w-full border border-acento/45 sm:block"
              />

              <div className="relative aspect-[4/5] w-full overflow-hidden bg-superficie-3 sm:aspect-[16/11] lg:aspect-[4/5]">
                <Image
                  src={fundador.foto}
                  alt={fundador.fotoAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={86}
                  className="object-cover object-top"
                />
              </div>
            </div>

            <p className="mt-5 text-[0.85rem] leading-snug text-tinta-3">
              <span className="block font-semibold text-tinta">
                {fundador.nombre}
              </span>
              {fundador.cargo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
