/* ==========================================================================
   Footer · pie de página
   --------------------------------------------------------------------------
   Única banda oscura del sitio, y va al final: cierra la página y ancla el
   azul de la identidad sin partir en dos la lectura.

   Contiene lo que la ley y el visitante esperan encontrar abajo: razón social
   y RUC, las once líneas de práctica agrupadas por materia, teléfonos, correo,
   las dos oficinas con enlace a la ruta, horario, redes, enlaces legales y el
   aviso visible del Libro de Reclamaciones.
   ========================================================================== */

import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";
import Icon from "@/components/ui/Icon";
import {
  firm,
  navegacion,
  serviciosAgrupados,
  oficinas,
  legales,
  pie,
} from "@/content/site";

export default function Footer() {
  const anio = new Date().getFullYear();
  const grupos = serviciosAgrupados();

  return (
    <footer className="marca-agua marca-agua-der marca-agua-clara bg-invertido text-sobre-invertido-2">
      <div className="contenedor py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* --- Marca --------------------------------------------------- */}
          <div className="lg:col-span-4">
            <BrandMark variante="claro" alto={40} />

            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              {pie.descripcion}
            </p>

            <p className="cifra mt-6 text-xs text-sobre-invertido-2/75">
              {firm.razonSocial}
              <br />
              RUC {firm.ruc}
            </p>

            <ul className="mt-7 flex gap-3">
              {firm.redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${firm.nombreCorto} en ${r.nombre}`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-white/18 text-sobre-invertido transition-colors duration-300 hover:border-enlace-claro hover:text-enlace-claro"
                  >
                    <Icon name={r.icono} className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Líneas de práctica, por familia -------------------------- */}
          <nav className="lg:col-span-5" aria-label="Líneas de práctica">
            <h2 className="mb-6 text-[0.68rem] font-semibold tracking-[0.16em] text-acento-claro uppercase">
              Líneas de práctica
            </h2>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {grupos.map((g) => (
                <div key={g.id}>
                  <p className="text-[0.72rem] font-semibold text-sobre-invertido">
                    {g.titulo}
                  </p>
                  <ul className="mt-3 space-y-2 text-[0.83rem]">
                    {g.items.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/servicios/${s.slug}`}
                          className="leading-snug transition-colors hover:text-sobre-invertido"
                        >
                          {s.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* --- Contacto y oficinas ------------------------------------- */}
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-[0.68rem] font-semibold tracking-[0.16em] text-acento-claro uppercase">
              Contacto
            </h2>

            <ul className="space-y-3.5 text-sm">
              {firm.telefonos.map((t) => (
                <li key={t.tel}>
                  <a
                    href={`tel:${t.tel}`}
                    className="cifra flex items-center gap-3 transition-colors hover:text-sobre-invertido"
                  >
                    <Icon
                      name="telefono"
                      className="h-4 w-4 flex-none text-acento-claro"
                    />
                    {t.etiqueta}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${firm.email}`}
                  className="flex items-center gap-3 text-[0.82rem] break-all transition-colors hover:text-sobre-invertido"
                >
                  <Icon
                    name="correo"
                    className="h-4 w-4 flex-none text-acento-claro"
                  />
                  {firm.email}
                </a>
              </li>
              {oficinas.map((o) => (
                <li key={o.id}>
                  <a
                    href={o.comoLlegar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 transition-colors hover:text-sobre-invertido"
                  >
                    <Icon
                      name="pin"
                      className="mt-0.5 h-4 w-4 flex-none text-acento-claro"
                    />
                    <span className="leading-snug">
                      {o.direccion}
                      <br />
                      {o.distrito}
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Icon
                  name="reloj"
                  className="mt-0.5 h-4 w-4 flex-none text-acento-claro"
                />
                <span className="leading-snug">
                  {firm.horario.semana}
                  <br />
                  {firm.horario.sabado}
                </span>
              </li>
            </ul>

            <nav aria-label="Navegación del pie" className="mt-8">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem]">
                {navegacion.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-sobre-invertido"
                    >
                      {item.etiqueta}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* --- Aviso del Libro de Reclamaciones ------------------------- */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-sobre-invertido-2/85">
            {pie.avisoReclamaciones}
          </p>
          <Link
            href="/libro-de-reclamaciones"
            className="inline-flex flex-none items-center gap-3 border border-white/25 px-5 py-3 text-[0.7rem] font-semibold tracking-[0.1em] text-sobre-invertido uppercase transition-colors duration-300 hover:border-enlace-claro hover:text-enlace-claro"
          >
            <span
              aria-hidden="true"
              className="inline-block h-4 w-3 border border-current"
            />
            Libro de Reclamaciones
          </Link>
        </div>
      </div>

      {/* --- Barra legal --------------------------------------------------- */}
      <div className="border-t border-white/10">
        <div className="contenedor flex flex-col gap-4 py-6 text-xs text-sobre-invertido-2/75 sm:flex-row sm:items-center sm:justify-between">
          {/* La razón social ya termina en punto, por eso no se agrega otro */}
          <p>
            © {anio} {firm.razonSocial} Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legales.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-sobre-invertido"
                >
                  {l.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
