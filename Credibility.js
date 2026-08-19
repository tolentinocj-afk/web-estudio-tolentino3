/* ==========================================================================
   Credibility · banda de indicadores
   --------------------------------------------------------------------------
   Cuatro cifras verificables, en monoespaciado y alineadas a la izquierda.
   No hay tarjetas: separan filetes finos, que es lo que corresponde cuando el
   contenido es un dato y no un bloque.

   La cuenta ascendente al entrar en pantalla dirige la mirada a la cifra, que
   es lo que hay que leer. Se ejecuta una sola vez y respeta la preferencia de
   movimiento reducido.
   ========================================================================== */

import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { credibilidad } from "@/content/site";

export default function Credibility() {
  return (
    <section
      className="border-y border-linea bg-superficie-2"
      aria-label="Indicadores de la firma"
    >
      <div className="contenedor grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:py-14">
        {credibilidad.map((item, i) => (
          <Reveal
            key={item.etiqueta}
            delay={i * 90}
            className={
              i > 0 ? "lg:border-l lg:border-linea lg:pl-8" : undefined
            }
          >
            <p className="cifra text-[2.5rem] leading-none font-semibold text-tinta lg:text-[2.8rem]">
              <Counter
                valor={item.valor}
                sufijo={item.sufijo}
                formato={item.formato}
              />
            </p>
            <p className="mt-3.5 text-[0.72rem] font-semibold tracking-[0.12em] text-acento uppercase">
              {item.etiqueta}
            </p>
            <p className="mt-2 max-w-[17rem] text-[0.85rem] leading-snug text-tinta-3">
              {item.detalle}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
