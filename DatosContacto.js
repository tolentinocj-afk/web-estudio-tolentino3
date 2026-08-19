/* ==========================================================================
   DatosContacto · panel de teléfonos, correo, horario y oficinas
   --------------------------------------------------------------------------
   Un solo componente para la portada, la página de contacto y las páginas de
   servicio. Así el dato vive en un sitio y no se desincroniza entre páginas.
   ========================================================================== */

import Icon from "@/components/ui/Icon";
import { firm, oficinas } from "@/content/site";

export default function DatosContacto({ conOficinas = true, className = "" }) {
  const urlWhatsapp = `https://wa.me/${firm.whatsapp.numero}?text=${encodeURIComponent(
    firm.whatsapp.mensajeBase,
  )}`;

  return (
    <div
      className={`flex h-full flex-col border-t-2 border-acento bg-superficie-2 p-8 lg:p-9 ${className}`}
    >
      <h3 className="text-[1.15rem]">Datos de contacto</h3>

      <ul className="mt-7 space-y-4 text-[0.95rem]">
        {firm.telefonos.map((t) => (
          <li key={t.tel}>
            <a
              href={`tel:${t.tel}`}
              className="cifra flex items-center gap-3.5 text-tinta transition-colors hover:text-enlace"
            >
              <Icon name="telefono" className="h-5 w-5 flex-none text-acento" />
              {t.etiqueta}
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${firm.email}`}
            className="flex items-center gap-3.5 break-all text-tinta transition-colors hover:text-enlace"
          >
            <Icon name="correo" className="h-5 w-5 flex-none text-acento" />
            {firm.email}
          </a>
        </li>
        <li className="flex items-start gap-3.5 text-tinta-2">
          <Icon name="reloj" className="mt-0.5 h-5 w-5 flex-none text-acento" />
          <span className="leading-relaxed">
            {firm.horario.semana}
            <br />
            {firm.horario.sabado}
          </span>
        </li>
      </ul>

      {conOficinas && (
        <>
          <h3 className="mt-9 border-t border-linea pt-8 text-[1.15rem]">
            Oficinas
          </h3>
          <ul className="mt-6 space-y-5 text-[0.93rem]">
            {oficinas.map((o) => (
              <li key={o.id} className="flex gap-3.5">
                <Icon name="pin" className="mt-0.5 h-5 w-5 flex-none text-acento" />
                <span className="leading-relaxed text-tinta-2">
                  <span className="block text-[0.7rem] font-semibold tracking-[0.12em] text-acento uppercase">
                    {o.nombre}
                  </span>
                  {o.direccion}
                  <br />
                  {o.distrito}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      <a
        href={urlWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 flex w-full items-center justify-center gap-3 border border-linea-fuerte px-6 py-4 text-[0.76rem] font-semibold tracking-[0.1em] text-tinta uppercase transition-colors duration-300 hover:border-enlace hover:text-enlace active:translate-y-px"
      >
        <Icon name="whatsapp" className="h-5 w-5" />
        Escribir por WhatsApp
      </a>
    </div>
  );
}
