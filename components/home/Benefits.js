/* ==========================================================================
   Benefits · qué gana el cliente al trabajar con la firma
   --------------------------------------------------------------------------
   Siete beneficios, siete celdas. La cuadrícula es asimétrica a propósito:
   celdas de distinto ancho y tres con tratamiento propio, para que el bloque
   tenga ritmo y no se lea como siete rectángulos iguales.
   ========================================================================== */

import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { beneficios } from "@/content/site";

/* Ancho de cada celda en la retícula de seis columnas, y tratamiento de fondo.
   El orden corresponde al de beneficios.lista en content/site.js. */
const CELDAS = [
  { ancho: "lg:col-span-3", fondo: "bg-acento-tenue" },
  { ancho: "lg:col-span-3", fondo: "bg-superficie" },
  { ancho: "lg:col-span-2", fondo: "bg-superficie" },
  { ancho: "lg:col-span-2", fondo: "bg-superficie-2" },
  { ancho: "lg:col-span-2", fondo: "bg-superficie" },
  { ancho: "lg:col-span-4", fondo: "bg-tinta text-superficie", oscura: true },
  { ancho: "lg:col-span-2", fondo: "bg-superficie" },
];

export default function Benefits() {
  return (
    <section
      className="bg-superficie py-20 lg:py-28"
      aria-labelledby="beneficios-titulo"
    >
      <div className="contenedor">
        <Reveal className="max-w-2xl">
          <h2
            id="beneficios-titulo"
            className="text-[1.9rem] leading-[1.12] sm:text-[2.3rem]"
          >
            {beneficios.titulo}
          </h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-tinta-2">
            {beneficios.bajada}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-6">
          {beneficios.lista.map((b, i) => {
            const celda = CELDAS[i] || {
              ancho: "lg:col-span-2",
              fondo: "bg-superficie",
            };

            return (
              <Reveal
                as="li"
                key={b.titulo}
                delay={i * 70}
                className={`${celda.ancho} ${celda.fondo} p-7 lg:p-8`}
              >
                <Icon
                  name={b.icono}
                  className={`h-7 w-7 ${celda.oscura ? "text-acento-claro" : "text-acento"}`}
                />
                <h3
                  className={`mt-5 text-[1.1rem] leading-snug ${
                    celda.oscura ? "text-superficie" : ""
                  }`}
                >
                  {b.titulo}
                </h3>
                <p
                  className={`mt-2.5 text-[0.92rem] leading-relaxed ${
                    celda.oscura ? "text-superficie/80" : "text-tinta-2"
                  }`}
                >
                  {b.texto}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
