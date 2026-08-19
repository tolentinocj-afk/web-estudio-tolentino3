"use client";

/* ==========================================================================
   Header · barra superior
   --------------------------------------------------------------------------
   Una sola línea en escritorio y 72 px de alto, que bajan a 60 px al
   desplazar. Nada de barras de agencia que se comen la primera pantalla.

   El estado "desplazado" no se calcula con un escucha de scroll: se coloca un
   testigo invisible en el tope del documento y se observa con
   IntersectionObserver. El navegador avisa cuando deja de verse, en lugar de
   hacernos preguntar en cada cuadro.

   El desplegable de servicios muestra las cuatro familias de materias, con lo
   que el visitante ubica la suya sin leer once títulos seguidos.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/ui/BrandMark";
import Icon from "@/components/ui/Icon";
import { firm, navegacion, serviciosAgrupados } from "@/content/site";

export default function Header() {
  const [desplazado, setDesplazado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [panelAbierto, setPanelAbierto] = useState(false);
  const cerrarPanel = useRef(null);
  const pathname = usePathname();
  const grupos = serviciosAgrupados();

  /* Testigo en el tope del documento */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const testigo = document.createElement("div");
    testigo.setAttribute("aria-hidden", "true");
    testigo.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:72px;pointer-events:none";
    document.body.prepend(testigo);

    const observador = new IntersectionObserver(
      ([e]) => setDesplazado(!e.isIntersecting),
      { threshold: 0 },
    );
    observador.observe(testigo);

    return () => {
      observador.disconnect();
      testigo.remove();
    };
  }, []);

  /* Cierra todo al cambiar de página. Se ajusta durante el renderizado, que es
     el patrón que React recomienda para reaccionar a un cambio de entrada, en
     lugar de un efecto que dispararía un segundo renderizado. */
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (pathname !== rutaPrevia) {
    setRutaPrevia(pathname);
    setMenuAbierto(false);
    setPanelAbierto(false);
  }

  /* Bloquea el desplazamiento del cuerpo con el menú móvil abierto */
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  /* Tecla Escape: cierra el desplegable y el menú móvil */
  useEffect(() => {
    const alPulsar = (e) => {
      if (e.key !== "Escape") return;
      setPanelAbierto(false);
      setMenuAbierto(false);
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, []);

  const esActivo = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Pequeño retardo al salir del desplegable, para poder alcanzarlo */
  const entrarPanel = () => {
    clearTimeout(cerrarPanel.current);
    setPanelAbierto(true);
  };
  const salirPanel = () => {
    cerrarPanel.current = setTimeout(() => setPanelAbierto(false), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-marca ${
        desplazado
          ? "border-linea bg-superficie/92 backdrop-blur-md"
          : "border-transparent bg-superficie"
      }`}
    >
      <div
        className={`contenedor flex items-center justify-between gap-6 transition-[height] duration-300 ease-marca ${
          desplazado ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${firm.nombreCorto}, ir al inicio`}
          className="flex-none"
        >
          <BrandMark alto={36} />
        </Link>

        {/* --- Navegación de escritorio ---------------------------------- */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Navegación principal"
        >
          {navegacion.map((item) =>
            item.href === "/servicios" ? (
              <div
                key={item.href}
                className="static"
                onMouseEnter={entrarPanel}
                onMouseLeave={salirPanel}
              >
                <Link
                  href={item.href}
                  onFocus={entrarPanel}
                  aria-expanded={panelAbierto}
                  className={`inline-flex items-center gap-1.5 border-b-2 py-1 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-colors ${
                    esActivo(item.href)
                      ? "border-tinta text-tinta"
                      : "border-transparent text-tinta-2 hover:text-tinta"
                  }`}
                >
                  {item.etiqueta}
                  <Icon
                    name="chevron"
                    className={`h-3 w-3 transition-transform duration-300 ${
                      panelAbierto ? "rotate-180" : ""
                    }`}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 py-1 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-colors ${
                  esActivo(item.href)
                    ? "border-tinta text-tinta"
                    : "border-transparent text-tinta-2 hover:text-tinta"
                }`}
              >
                {item.etiqueta}
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-none items-center gap-3">
          <a
            href={`tel:${firm.telefonos[0].tel}`}
            className="hidden items-center gap-2 text-[0.8rem] font-medium text-tinta-2 transition-colors hover:text-enlace xl:inline-flex"
          >
            <Icon name="telefono" className="h-4 w-4 text-acento" />
            {firm.telefonos[0].etiqueta}
          </a>

          <Link
            href="/contacto"
            className="hidden bg-tinta px-5 py-2.5 text-[0.74rem] font-semibold tracking-[0.1em] text-superficie uppercase transition-colors duration-300 hover:bg-enlace md:inline-flex"
          >
            Agendar consulta
          </Link>

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            className="-mr-1.5 p-1.5 text-tinta lg:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            <Icon name={menuAbierto ? "cerrar" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* --- Desplegable de servicios, por familias -------------------- */}
      <div
        onMouseEnter={entrarPanel}
        onMouseLeave={salirPanel}
        className={`absolute inset-x-0 top-full hidden border-b border-linea bg-superficie transition-[opacity,transform] duration-200 ease-marca lg:block ${
          panelAbierto
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="contenedor grid grid-cols-4 gap-x-8 gap-y-6 py-9">
          {grupos.map((g) => (
            <div key={g.id}>
              <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-acento uppercase">
                {g.titulo}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="block text-[0.85rem] leading-snug text-tinta-2 transition-colors hover:text-tinta"
                    >
                      {s.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- Menú móvil ------------------------------------------------- */}
      <div
        className={`fixed inset-0 z-40 h-dvh overflow-y-auto bg-superficie px-5 pt-24 pb-16 transition-transform duration-300 ease-marca lg:hidden ${
          menuAbierto ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuAbierto}
      >
        <button
          type="button"
          onClick={() => setMenuAbierto(false)}
          className="absolute top-6 right-5 p-1.5 text-tinta"
          aria-label="Cerrar menú"
        >
          <Icon name="cerrar" className="h-6 w-6" />
        </button>

        <nav aria-label="Navegación móvil">
          <ul>
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-linea py-4 text-2xl font-semibold tracking-[-0.02em] text-tinta"
                >
                  {item.etiqueta}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-7">
            {grupos.map((g) => (
              <div key={g.id}>
                <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-acento uppercase">
                  {g.titulo}
                </p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="block text-[0.92rem] leading-snug text-tinta-2"
                      >
                        {s.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3 border-t border-linea pt-8 text-[0.92rem] text-tinta-2">
            {firm.telefonos.map((t) => (
              <a
                key={t.tel}
                href={`tel:${t.tel}`}
                className="flex items-center gap-3"
              >
                <Icon name="telefono" className="h-4 w-4 text-acento" />
                {t.etiqueta}
              </a>
            ))}
            <a
              href={`mailto:${firm.email}`}
              className="flex items-center gap-3 break-all"
            >
              <Icon name="correo" className="h-4 w-4 text-acento" />
              {firm.email}
            </a>
          </div>

          <Link
            href="/contacto"
            className="mt-8 inline-flex w-full items-center justify-center bg-tinta px-6 py-4 text-[0.78rem] font-semibold tracking-[0.1em] text-superficie uppercase"
          >
            Agendar consulta
          </Link>
        </nav>
      </div>
    </header>
  );
}
