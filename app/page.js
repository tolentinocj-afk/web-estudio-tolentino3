/* ==========================================================================
   Página de inicio
   --------------------------------------------------------------------------
   Ocho bloques, ocho composiciones distintas. Ninguna se repite, para que el
   recorrido no se sienta como una plantilla de secciones iguales:

   1. Apertura           · dos columnas asimétricas con retrato
   2. Indicadores        · banda horizontal de cifras
   3. Líneas de práctica · cuatro familias en retícula de filetes
   4. Metodología        · fotografía y secuencia vertical
   5. Beneficios         · retícula asimétrica de siete celdas
   6. Socio fundador     · retrato y credenciales
   7. Preguntas          · acordeón a todo el ancho
   8. Contacto           · formulario, datos y mapas

   La barra superior, el pie y el botón de WhatsApp viven en el layout raíz.
   ========================================================================== */

import Hero from "@/components/home/Hero";
import Credibility from "@/components/home/Credibility";
import Services from "@/components/home/Services";
import Methodology from "@/components/home/Methodology";
import Benefits from "@/components/home/Benefits";
import Founder from "@/components/home/Founder";
import Faq from "@/components/home/Faq";
import ContactSection from "@/components/home/ContactSection";

export default function Inicio() {
  return (
    <>
      <Hero />
      <Credibility />
      <Services />
      <Methodology />
      <Benefits />
      {/* Encuadre cuadrado: la apertura ya muestra el retrato vertical */}
      <Founder
        foto="/images/socio-fundador-cuadrado.webp"
        proporcion="aspect-square"
      />
      <Faq />
      <ContactSection />
    </>
  );
}
