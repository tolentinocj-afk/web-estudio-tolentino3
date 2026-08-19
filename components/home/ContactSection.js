/* ==========================================================================
   ContactSection · cierre de la portada
   --------------------------------------------------------------------------
   Formulario a la izquierda, datos de la firma a la derecha y las dos sedes
   debajo. El formulario ocupa el lugar principal porque es la acción que la
   página persigue.
   ========================================================================== */

import ContactForm from "@/components/forms/ContactForm";
import DatosContacto from "@/components/contacto/DatosContacto";
import Mapas from "@/components/contacto/Mapas";
import Reveal from "@/components/ui/Reveal";
import { contacto } from "@/content/site";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-linea bg-superficie-2 py-20 lg:py-28"
      aria-labelledby="contacto-titulo"
    >
      <div className="contenedor">
        <Reveal className="max-w-2xl">
          <h2
            id="contacto-titulo"
            className="text-[1.9rem] leading-[1.12] sm:text-[2.4rem]"
          >
            {contacto.titulo}
          </h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-tinta-2">
            {contacto.bajada}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="bg-superficie p-8 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={110} className="lg:col-span-5">
            <DatosContacto className="border border-linea border-t-2 border-t-acento bg-superficie" />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Mapas />
        </Reveal>
      </div>
    </section>
  );
}
