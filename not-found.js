/* ==========================================================================
   Página 404 · dirección no encontrada
   --------------------------------------------------------------------------
   En lugar de un mensaje seco, ofrece las rutas más probables para que el
   visitante no abandone el sitio.
   ========================================================================== */

import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { servicios } from "@/content/site";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NoEncontrada() {
  const destacados = servicios.slice(0, 4);

  return (
    <section className="marca-agua marca-agua-der flex min-h-[80dvh] items-center bg-superficie pt-28 pb-20">
      <div className="contenedor">
        <p className="cifra text-[0.8rem] font-semibold tracking-[0.12em] text-acento uppercase">
          Error 404
        </p>

        <h1 className="mt-6 max-w-3xl text-[2.2rem] leading-[1.08] sm:text-[2.8rem] lg:text-[3.2rem]">
          Esta página no existe o cambió de dirección
        </h1>

        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-tinta-2">
          Es posible que el enlace esté desactualizado o que la dirección se
          haya escrito de otra forma. Estas son las rutas más consultadas.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href="/" variante="solido">
            Ir al inicio
            <Icon name="flecha" className="h-4 w-4" />
          </Button>
          <Button href="/contacto" variante="contorno">
            Agendar consulta
          </Button>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-4 border-t border-linea pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group inline-flex items-start gap-2.5 text-[0.92rem] leading-snug text-tinta-2 transition-colors hover:text-tinta"
              >
                <Icon
                  name="flecha"
                  className="mt-1 h-4 w-4 flex-none text-acento transition-transform group-hover:translate-x-1"
                />
                {s.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
