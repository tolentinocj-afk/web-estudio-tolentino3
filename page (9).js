/* ==========================================================================
   /libro-de-reclamaciones — Libro de Reclamaciones virtual
   --------------------------------------------------------------------------
   Conforme al Código de Protección y Defensa del Consumidor (Ley 29571) y a su
   Reglamento del Libro de Reclamaciones (Decreto Supremo 011-2011-PCM).
   ========================================================================== */

import PageHeader from "@/components/layout/PageHeader";
import LibroReclamacionesForm from "@/components/forms/LibroReclamacionesForm";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { firm, oficinas } from "@/content/site";

export const metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones virtual de Estudio Tolentino & Asociados S.A.C., conforme a la Ley 29571 y al Decreto Supremo 011-2011-PCM.",
  alternates: { canonical: "/libro-de-reclamaciones" },
};

export default function LibroDeReclamaciones() {
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          antetitulo="Ley 29571"
          titulo="Libro de Reclamaciones virtual"
          bajada="Conforme al Código de Protección y Defensa del Consumidor y a su Reglamento del Libro de Reclamaciones, aprobado por Decreto Supremo 011-2011-PCM."
          migas={[{ etiqueta: "Libro de Reclamaciones" }]}
        />
      </div>

      <section className="bg-superficie py-16 lg:py-20">
        <div className="contenedor grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Columna informativa ------------------------------------- */}
          <Reveal className="print:hidden lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Identificación del proveedor */}
              <div className="border-t-2 border-acento pt-6">
                <h2 className="text-[0.7rem] font-semibold tracking-[0.14em] text-tinta uppercase">
                  Identificación del proveedor
                </h2>
                <dl className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-tinta-2">
                  <div>
                    <dt className="text-[0.7rem] tracking-[0.06em] text-tinta-3 uppercase">
                      Razón social
                    </dt>
                    <dd className="text-tinta">{firm.razonSocial}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] tracking-[0.06em] text-tinta-3 uppercase">
                      RUC
                    </dt>
                    <dd className="cifra text-tinta">{firm.ruc}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] tracking-[0.06em] text-tinta-3 uppercase">
                      Domicilio
                    </dt>
                    <dd className="text-tinta">
                      {oficinas[0].direccion}
                      <br />
                      {oficinas[0].distrito}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Diferencia entre reclamo y queja */}
              <div className="border border-linea bg-superficie-2 p-6">
                <h2 className="text-[0.7rem] font-semibold tracking-[0.14em] text-tinta uppercase">
                  Reclamo y queja no son lo mismo
                </h2>
                <dl className="mt-4 space-y-4 text-[0.9rem] leading-relaxed text-tinta-2">
                  <div>
                    <dt className="font-semibold text-tinta">Reclamo</dt>
                    <dd>
                      Disconformidad relacionada con los servicios contratados.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-tinta">Queja</dt>
                    <dd>
                      Malestar o descontento respecto de la atención al público,
                      no relacionado con el servicio en sí.
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Plazo legal */}
              <div className="flex gap-4 border-l-2 border-acento bg-superficie-2 py-5 pr-6 pl-6">
                <Icon
                  name="reloj"
                  className="mt-0.5 h-5 w-5 flex-none text-acento"
                />
                <div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-tinta uppercase">
                    Plazo de respuesta
                  </p>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-tinta-2">
                    Quince (15) días hábiles improrrogables, contados desde el
                    día siguiente de la presentación, conforme a la Ley 29571
                    modificada por la Ley 31435.
                  </p>
                </div>
              </div>

              <p className="text-[0.85rem] leading-relaxed text-tinta-3">
                La formulación del reclamo no impide acudir a otras vías de
                solución de controversias ni constituye una vía previa para
                denunciar ante el INDECOPI.
              </p>
            </div>
          </Reveal>

          {/* --- Formulario ---------------------------------------------- */}
          <div className="lg:col-span-8">
            <LibroReclamacionesForm />
          </div>
        </div>
      </section>
    </>
  );
}
