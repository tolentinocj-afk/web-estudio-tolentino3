/* ==========================================================================
   FondoImagen · fotografía de fondo con velo oscuro
   --------------------------------------------------------------------------
   Resuelve los espacios fotográficos opcionales declarados en el objeto
   "imagenes" de content/site.js.

   Si no hay imagen configurada no renderiza nada: la sección conserva su
   composición y no queda un hueco. Por eso el sitio se ve terminado con
   fotografías y sin ellas.

   El velo no es decorativo. Garantiza que el texto blanco cumpla el contraste
   exigido por WCAG AA sobre cualquier fotografía, incluso si tiene zonas
   claras. La intensidad se regula con "intensidad".
   ========================================================================== */

import Image from "next/image";

const VELOS = {
  // El texto ocupa un lado: la fotografía respira en el otro
  suave:
    "bg-[linear-gradient(100deg,rgba(10,14,23,0.93)_0%,rgba(22,29,48,0.84)_48%,rgba(22,29,48,0.55)_100%)]",
  // Texto sobre toda la superficie
  media:
    "bg-[linear-gradient(180deg,rgba(10,14,23,0.9)_0%,rgba(22,29,48,0.86)_100%)]",
  // La fotografía queda como textura de fondo
  fuerte:
    "bg-[linear-gradient(180deg,rgba(10,14,23,0.94)_0%,rgba(22,29,48,0.92)_100%)]",
};

export default function FondoImagen({
  imagen,
  intensidad = "media",
  prioridad = false,
  className = "",
}) {
  if (!imagen?.src) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src={imagen.src}
        alt={imagen.alt || ""}
        fill
        priority={prioridad}
        sizes="100vw"
        quality={82}
        className="object-cover"
        style={{ objectPosition: imagen.posicion || "center" }}
      />
      <div className={`absolute inset-0 ${VELOS[intensidad] || VELOS.media}`} />
    </div>
  );
}
