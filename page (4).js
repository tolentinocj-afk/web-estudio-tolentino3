/* ==========================================================================
   /contacto · formulario, datos de las oficinas y mapas
   ========================================================================== */

import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import DatosContacto from "@/components/contacto/DatosContacto";
import Mapas from "@/components/contacto/Mapas";
import Reveal from "@/components/ui/Reveal";
import { contacto } from "@/content/site";

export const metadata = {
  title: "Contacto",
  description:
    "Agenda una consulta con Estudio Tolentino & Asociados. Oficinas en Miraflores (Lima) y Chilca (Cañete).",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <>
      <PageHeader
        antetitulo={contacto.antetitulo}
        titulo="Agenda tu consulta"
        bajada={contacto.bajada}
        migas={[{ etiqueta: "Contacto" }]}
      />

      <section className="bg-superficie py-16 lg:py-24">
        <div className="contenedor grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="border border-linea bg-superficie p-8 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={110} className="lg:col-span-5">
            <DatosContacto />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-linea bg-superficie-2 py-16 lg:py-20">
        <div className="contenedor">
          <Reveal>
            <Mapas alto="h-72" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
