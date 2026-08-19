/* ==========================================================================
   Button · botón o enlace de acción
   --------------------------------------------------------------------------
   Geometría de la casa: ángulo recto, radio 0.

   Variantes y contraste (WCAG AA verificado sobre su fondo previsto):
     solido    → tinta sobre superficie clara, texto blanco. Acción principal.
     acento    → bronce sólido, texto blanco. Acción principal alternativa.
     contorno  → borde fino sobre superficie clara.
     invertido → borde claro sobre banda oscura.

   Retroalimentación táctil: al presionar, el botón baja un píxel.
   ========================================================================== */

import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.1em] transition-[background-color,border-color,color,transform] duration-300 ease-marca active:translate-y-px";

const variantes = {
  solido: "bg-tinta text-superficie hover:bg-enlace",
  acento: "bg-enlace text-white hover:bg-tinta",
  contorno:
    "border border-linea-fuerte text-tinta hover:border-enlace hover:text-enlace",
  invertido:
    "border border-white/35 text-white hover:border-enlace-claro hover:text-enlace-claro",
};

export default function Button({
  href,
  variante = "solido",
  className = "",
  children,
  ...props
}) {
  const clases = `${base} ${variantes[variante] || variantes.solido} ${className}`;

  if (href) {
    const esExterno = href.startsWith("http") || href.startsWith("#");
    if (esExterno) {
      return (
        <a href={href} className={clases} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={clases} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clases} {...props}>
      {children}
    </button>
  );
}
