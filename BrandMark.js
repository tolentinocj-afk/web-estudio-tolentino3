/* ==========================================================================
   BrandMark · imagotipo oficial
   --------------------------------------------------------------------------
   Ya no es una reconstrucción con tipografía suelta: son los archivos
   vectoriales de public/marca/, con el azul #1c2341 y el gris #626260 del
   manual, y el cruce real de la T sobre el ampersand.

   Se usa <picture> con consultas de medios en cada <source> para que el
   navegador descargue UN solo archivo, el que corresponde:

     pantalla angosta  → monograma, porque el imagotipo completo por debajo de
                         197 px de ancho quedaría bajo el tamaño mínimo que
                         fija el manual
     modo oscuro       → versión clara, blanco con gris claro #b1b1b1
     resto             → versión principal

   variante "claro" fuerza la versión clara: es la que va sobre la banda azul
   del pie, donde el fondo es siempre oscuro.

   Las medidas respetan el mínimo del manual: a 36 px de alto el imagotipo
   mide 205 px de ancho, por encima de los 197.07 px exigidos.
   ========================================================================== */

/* next/image no optimiza SVG, y aquí hace falta dirección de arte real:
   distinto archivo según ancho de pantalla y según modo claro u oscuro. Eso
   lo resuelve <picture> con consultas de medios, y además descarga un solo
   archivo. Por eso se usa <img> a propósito. */
/* eslint-disable @next/next/no-img-element */

const PROPORCION = 5.704; // ancho / alto del imagotipo
const PROPORCION_MONO = 1.853; // ancho / alto del monograma

export default function BrandMark({
  variante = "auto",
  alto = 36,
  className = "",
}) {
  const ancho = Math.round(alto * PROPORCION);
  const anchoMono = Math.round(alto * PROPORCION_MONO);
  const alt = "Estudio Tolentino & Asociados, abogados y contadores";

  if (variante === "claro") {
    return (
      <picture className={className}>
        <source
          srcSet="/marca/monograma-claro.svg"
          media="(max-width: 380px)"
          width={anchoMono}
          height={alto}
        />
        <img
          src="/marca/imagotipo-claro.svg"
          alt={alt}
          width={ancho}
          height={alto}
          style={{ height: alto, width: "auto" }}
          className="block"
        />
      </picture>
    );
  }

  return (
    <picture className={className}>
      <source
        srcSet="/marca/monograma-claro.svg"
        media="(prefers-color-scheme: dark) and (max-width: 460px)"
        width={anchoMono}
        height={alto}
      />
      <source
        srcSet="/marca/monograma.svg"
        media="(max-width: 460px)"
        width={anchoMono}
        height={alto}
      />
      <source
        srcSet="/marca/imagotipo-claro.svg"
        media="(prefers-color-scheme: dark)"
        width={ancho}
        height={alto}
      />
      <img
        src="/marca/imagotipo.svg"
        alt={alt}
        width={ancho}
        height={alto}
        style={{ height: alto, width: "auto" }}
        className="block"
      />
    </picture>
  );
}

/* --------------------------------------------------------------------------
   Monograma · solo el icono T&A
   --------------------------------------------------------------------------
   Para favicon, marca de agua y cualquier espacio donde no quepa el
   imagotipo completo.
   -------------------------------------------------------------------------- */

export function Monograma({ variante = "auto", alto = 40, className = "" }) {
  const ancho = Math.round(alto * PROPORCION_MONO);
  const alt = "Monograma T&A de Estudio Tolentino & Asociados";

  if (variante === "claro") {
    return (
      <img
        src="/marca/monograma-claro.svg"
        alt={alt}
        width={ancho}
        height={alto}
        style={{ height: alto, width: "auto" }}
        className={`block ${className}`}
      />
    );
  }

  return (
    <picture className={className}>
      <source
        srcSet="/marca/monograma-claro.svg"
        media="(prefers-color-scheme: dark)"
        width={ancho}
        height={alto}
      />
      <img
        src="/marca/monograma.svg"
        alt={alt}
        width={ancho}
        height={alto}
        style={{ height: alto, width: "auto" }}
        className="block"
      />
    </picture>
  );
}
