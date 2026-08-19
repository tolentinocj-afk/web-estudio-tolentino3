/* ==========================================================================
   Mapas · fichas de las dos sedes
   --------------------------------------------------------------------------
   Mapa incrustado con carga diferida, dirección y enlace a la ruta. El de
   Chilca va por Plus Code, que en esa zona ubica mejor que la dirección.
   ========================================================================== */

import Icon from "@/components/ui/Icon";
import { oficinas } from "@/content/site";

export default function Mapas({ alto = "h-64" }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {oficinas.map((o) => (
        <figure key={o.id} className="border border-linea bg-superficie">
          <iframe
            src={o.mapa}
            title={`Mapa de la ${o.nombre}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`w-full ${alto} grayscale-[40%]`}
          />
          <figcaption className="flex flex-col gap-3 border-t border-linea px-5 py-4 text-[0.86rem] text-tinta-2 sm:flex-row sm:items-end sm:justify-between">
            <span>
              <span className="block text-[0.7rem] font-semibold tracking-[0.12em] text-tinta uppercase">
                {o.nombre}
              </span>
              {o.direccion}
              <br />
              {o.distrito}
            </span>
            <a
              href={o.comoLlegar}
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-linea flex-none text-[0.72rem] font-semibold tracking-[0.1em] text-enlace uppercase"
            >
              Cómo llegar
              <Icon name="flecha" className="h-4 w-4" />
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
