# Sitio web — Estudio Tolentino & Asociados S.A.C.

Sitio institucional construido con **Next.js 16 (App Router) + React 19 + Tailwind CSS 4**.
Todo el contenido editable vive en un solo archivo: `content/site.js`.

---

## 0. Versión 3 del diseño (agosto de 2026)

Conforma el sitio al **manual de marca oficial** (3R CORE, enero de 2024). No
cambia ninguna dirección, ningún texto ni la composición de las páginas: la
versión 3 es la versión 2 con la piel corregida.

### Qué se corrigió

| | Versión 2 | Versión 3 |
|---|---|---|
| Acento | bronce `#85683A`, que no existe en el manual | gris `#626260`, el del ampersand del imagotipo |
| Azul | `#2E3A59` | `#1c2341`, el del manual |
| Tipografía | Instrument Sans más Geist Mono | Montserrat, la que el manual define para digital |
| Logotipo | reconstrucción con tipografía suelta | imagotipo vectorial real, con el cruce de la T sobre el ampersand |
| Textura | retícula inventada | monograma T&A como marca de agua, el elemento gráfico del manual |
| Pie de página | azul genérico | azul de marca `#1c2341` con gris claro `#b1b1b1` |

### La única extensión de la paleta

El manual tiene azul y dos grises, y ninguno sirve para señalar interacción:
un enlace quedaría del mismo color que el texto. Se añadió **un solo color
funcional**, `--t-enlace` `#2b4ea8`, que es el azul de marca con más
luminosidad y croma. Se usa exclusivamente en foco de teclado, estados de los
campos de formulario, enlaces del cuerpo de los artículos y estados hover de
los botones. Nunca en la marca ni en superficies. Contraste sobre blanco
7.6:1.

Está aislado en un token: si 3R Core prefiere otro valor, se cambia en una
línea de `app/globals.css`.

### Archivos de marca

`public/marca/` contiene el imagotipo y el monograma, cada uno en versión
principal y en versión clara para fondos oscuros. Se obtuvieron vectorizando
el original del manual, que dentro del PDF está como mapa de bits de 914 px.
**Son un calco fiel, no el archivo original**: conviene pedir el vectorial a
la agencia y sustituirlos.

`components/ui/BrandMark.js` los sirve con `<picture>` y consultas de medios,
de modo que el navegador descarga un solo archivo: monograma en pantallas
angostas, porque el imagotipo completo por debajo de 197 px violaría el
tamaño mínimo del manual, y versión clara en modo oscuro.

### Modo oscuro

El manual no lo contempla. Se construye derivando del azul de marca, sin
matices nuevos: las superficies son ese azul oscurecido y el gris claro
`#b1b1b1` pasa a ser el acento. Se apaga borrando el bloque
`@media (prefers-color-scheme: dark)` de `app/globals.css`.

---

## 1. Versión 2 del diseño (agosto de 2026)

Rediseño completo de la capa visual. **No cambió ninguna dirección, ningún
texto de fondo ni ningún dato**: las 22 páginas, sus rutas, sus metadatos y sus
datos estructurados son los mismos. Cambió cómo se ven.

### Qué cambió

| | Versión 1 | Versión 2 |
|---|---|---|
| Tipografía | Playfair Display + Inter | Instrument Sans + Geist Mono para cifras |
| Fondo | crema cálido, con bandas azul marino intercaladas | neutro frío; el azul queda para el pie |
| Acento | bronce `#8A7355` (contraste 4.5:1, al límite) | bronce `#85683A` (contraste 5.2:1) |
| Modo oscuro | no existía | completo, por `prefers-color-scheme` |
| Apertura | banda azul con parallax y texto centrado a la izquierda | dos columnas, con el retrato del socio fundador |
| Servicios | once tarjetas iguales | cuatro familias de materias |
| Barra superior | franja de contacto + barra, dos alturas | una sola línea de 72 px, con desplegable por familias |
| Movimiento | parallax con escucha de scroll | entrada escalonada y aparición con IntersectionObserver |

### Reglas del sistema

- **Color.** Ningún componente escribe un color literal: todos usan un token
  semántico (`superficie`, `tinta`, `linea`, `acento`). Los tokens se declaran
  dos veces, claro y oscuro, en `app/globals.css`. Cambiar el sitio de modo no
  exige tocar una sola clase.
- **Forma.** Radio 0 en todo: tarjetas, campos y botones. La única excepción es
  el botón flotante de WhatsApp, circular porque así lo espera quien usa la
  aplicación.
- **Tipografía.** Una sola familia. El monoespaciado se reserva a las cifras
  (indicadores, teléfonos, colegiaturas, fechas), para que las columnas de
  números queden alineadas.
- **Antetítulos.** Como máximo uno cada tres bloques por página. La regla se
  verificó página por página.
- **Movimiento.** Nivel contenido y siempre con motivo: jerarquía en la
  apertura, secuencia de lectura al desplazar, respuesta al interactuar. Nada
  se mueve en bucle. Todo respeta `prefers-reduced-motion`.

### Detalle técnico que conviene no deshacer

Los estilos de etiqueta (`html`, `body`, `h1`–`h4`) van dentro de
`@layer base` en `globals.css`. Si se sacaran de la capa, ganarían a las
utilidades de Tailwind y un `text-acento` sobre un `<h2>` dejaría de
funcionar, con titulares saliendo del color equivocado sobre fondos oscuros.

### Agrupación de servicios

`content/site.js` exporta `grupos` y `serviciosAgrupados()`. Para mover un
servicio de familia basta con cambiar su slug de lista. Un servicio que no
figure en ninguna se muestra igualmente, al final, de modo que nunca queda
invisible por olvido.

---

## 1. Instalación y ejecución

Requisito: Node.js 20 o superior.

```bash
npm install          # instala dependencias
npm run dev          # entorno de desarrollo en http://localhost:3000
npm run build        # compila la versión de producción
npm start            # sirve la versión compilada
```

## 2. Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto (a partir de `.env.example`):

```
NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Puede ser la misma clave en ambas. La primera la usa el formulario de contacto
desde el navegador; la segunda la usa el Libro de Reclamaciones desde el
servidor, donde no queda expuesta.

La clave se obtiene gratis en <https://web3forms.com> indicando
`informes@tolentinoyasociados.com` como correo de destino. Mientras no exista,
los formularios validan los campos y avisan que el envío no está configurado,
sin perder los datos escritos y sin dar por registrada una hoja que nadie
recibiría.

## 3. Despliegue

Recomendado: **Vercel** (plan gratuito suficiente para este sitio).

1. Subir el proyecto a un repositorio de GitHub.
2. En Vercel: *Add New Project* → importar el repositorio.
3. Cargar `NEXT_PUBLIC_WEB3FORMS_KEY` y `WEB3FORMS_KEY` en *Environment Variables*.
4. Apuntar el dominio `tolentinoyasociados.com` desde el panel de Vercel.

**Importante:** el sitio necesita un hosting con Node, no un bucket de archivos
estáticos. El Libro de Reclamaciones usa una ruta de servidor
(`/api/libro-de-reclamaciones`) para generar el código correlativo y el sello
de fecha y hora, que no pueden generarse en el navegador sin perder valor
probatorio. Vercel, Netlify con runtime de Next, Railway o un VPS con Node
sirven. Un hosting compartido de solo archivos, no.

## 4. Dónde se edita cada cosa

| Qué quieres cambiar | Archivo |
|---|---|
| Cualquier texto, teléfono, dirección, servicio o pregunta frecuente | `content/site.js` |
| Colores, tipografías, animaciones | `app/globals.css` (bloque `@theme`) |
| Estructura de la portada | `app/page.js` y `components/home/` |
| Barra superior y pie de página | `components/layout/` |
| Formularios | `components/forms/ContactForm.js` |
| Íconos | `components/ui/Icon.js` |

Agregar una nueva línea de práctica: basta con añadir un objeto al arreglo
`servicios` de `content/site.js`. La tarjeta del inicio, la página interna
`/servicios/[slug]`, el menú, el pie de página, el sitemap y el mensaje
prellenado de WhatsApp se generan solos.

Ojo con el conteo: la cuadrícula de servicios cierra con una celda de WhatsApp
para completar filas de cuatro. Con once servicios más esa celda son doce, que
es lo que cuadra. Si el número de servicios cambia, revisa que la cuadrícula no
quede con huecos.

## 5. Estructura del proyecto

```
app/
  layout.js                    barra superior, pie, WhatsApp, SEO, schema.org
  page.js                      portada
  not-found.js                 página 404 con rutas sugeridas
  globals.css                  sistema de diseño y estilos de impresión
  sitemap.js  robots.js        SEO técnico
  servicios/page.js            índice de líneas de práctica
  servicios/[slug]/page.js     página interna de cada servicio (automática)
  nosotros/page.js             misión, visión, valores y socio fundador
  recursos/page.js             listado de artículos
  recursos/[slug]/page.js      artículo (automática, desde Markdown)
  contacto/page.js             formulario, datos y mapas
  libro-de-reclamaciones/      hoja virtual conforme a Ley 29571
  api/libro-de-reclamaciones/  ruta de servidor: correlativo y sello de tiempo
  politica-de-privacidad/      Ley 29733 y D.S. 016-2024-JUS
  terminos-de-uso/             condiciones de uso del sitio
components/
  layout/    Header, Footer, WhatsAppFloat, PageHeader, LegalPage
  home/      Hero, Credibility, Services, Methodology, Benefits,
             Founder, Faq, ContactSection
  forms/     ContactForm, LibroReclamacionesForm
  ui/        BrandMark, Icon, Button, Reveal, Counter
content/
  site.js                      TODO el contenido editable del sitio
  recursos/*.md                un archivo por artículo
lib/
  recursos.js                  lectura y conversión de los artículos Markdown
public/
  images/socio-fundador.webp   retrato del socio fundador
  og-image.jpg                 imagen para redes sociales
  favicon.svg, icon-192.png, icon-512.png, apple-icon.png
```

## 5 bis. Publicar un artículo nuevo

Crear un archivo `.md` en `content/recursos/` y desplegar. El listado, la
página del artículo, el sitemap y los datos estructurados se generan solos.
El encabezado del archivo es así:

```markdown
---
titulo: "Título del artículo"
resumen: "Una o dos líneas que se muestran en el listado."
categoria: "Tributario"
fecha: "2026-09-01"
autor: "Carlos José Tolentino Béjar"
lectura: 6
destacado: false
---

Aquí va el cuerpo en Markdown.
```

Poner `destacado: true` lo sube al primer lugar del listado, en formato ancho.

## 6. Accesibilidad y rendimiento

- Contraste conforme a WCAG AA en todas las combinaciones de la paleta.
- Navegación completa por teclado, enlace de salto al contenido y anillo de foco visible.
- Etiquetas semánticas, `aria-label`, `aria-expanded` y `role="region"` en el acordeón.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Tipografías autoalojadas: cero peticiones a servidores de Google.
- Páginas generadas de forma estática (SSG), sin JavaScript innecesario.

## 7. Pendientes de reemplazo por el cliente

Buscar el comentario `⚠️ PENDIENTE` dentro de `content/site.js`.

**Textos y datos**

- [ ] Dominio definitivo del sitio (`firm.dominio`). Es el único dato que
      todavía bloquea la publicación.
- [x] Redes sociales: Facebook, Instagram y TikTok, ya cargadas.
- [x] Dirección de Chilca confirmada: segundo piso, Oficina 201.
- [x] Mapas de ambas sedes, con enlace "Cómo llegar".
- [x] Clave de Web3Forms cargada.
- [ ] Confirmar el horario de atención (sábados incluidos).
- [ ] Revisar y aprobar las nueve preguntas frecuentes, redactadas como propuesta.
- [ ] Si el estudio abre LinkedIn, agregarlo al arreglo `firm.redes` de
      `content/site.js`. El ícono ya existe en `components/ui/Icon.js`.

## 7 bis. Modelo comercial publicado

Criterio vigente en la web, definido por el estudio:

- **Primer contacto sin costo**: conversación de diez a quince minutos para
  determinar si el caso encaja y qué alcance tendría. Solo después se cotiza.
- **Outsourcing contable y de planillas**: único servicio con precio publicado,
  "planes desde S/ 200 mensuales, según volumen de operaciones y régimen".
- **Todos los demás servicios**: "sujeto a evaluación del caso", con propuesta
  de honorarios por escrito antes de iniciar.

El campo `precio` de cada servicio en `content/site.js` controla este texto.
Nota: el documento interno de constitución de empresas fija un precio cerrado
de S/ 690 (S/ 840 referencial con pagos externos). No se publica por decisión
del estudio, pero es el candidato natural si en algún momento se quiere abrir
un servicio con precio visible, porque es de ticket bajo y alcance cerrado.

**Imágenes**

- [x] Fotografía formal del socio fundador. Ya incorporada en
      `public/images/socio-fundador.webp`.
- [ ] Cuatro fotografías de sección, opcionales. Los espacios ya están
      habilitados en el objeto `imagenes` de `content/site.js`: `hero`,
      `metodologia`, `nosotros` y `cabeceras`. Cada uno funciona sin imagen: si
      `src` queda en `null`, la sección conserva su textura sobre azul marino.
      Para activar una foto, dejar el archivo en `public/images/` y escribir su
      ruta. Ver la guía de descarga entregada aparte.
- [ ] Imagotipo original en formato vectorial (SVG o AI). El archivo entregado
      llegó en negro sólido, sin contenido legible, por lo que el imagotipo
      actual es una reconstrucción tipográfica. Al recibir el vector se
      reemplaza en `components/ui/BrandMark.js`.

**Configuración**

- [ ] **Probar los formularios una vez desplegado.** La clave de Web3Forms está
      cargada, pero no se pudo verificar de extremo a extremo desde el entorno
      donde se construyó el sitio, que no tiene salida a `api.web3forms.com`.
      Al publicar, enviar una consulta de prueba desde `/contacto` y una hoja de
      prueba desde `/libro-de-reclamaciones`, y confirmar que ambas llegan a
      `informes@tolentinoyasociados.com`. Revisar también la carpeta de correo
      no deseado la primera vez.
- [ ] Identificadores de Google Analytics, Google Search Console y Meta Pixel.
- [ ] Verificar el perfil de Google Business de ambas sedes. Los mapas ya
      apuntan a la ubicación correcta; un perfil verificado mejora el
      posicionamiento local y permite recibir reseñas.

**Revisión legal antes de publicar**

Las páginas de Política de Privacidad y Términos de Uso son un **borrador
técnico** que requiere el visto bueno del estudio. Tres puntos a confirmar:

- [ ] Inscripción o actualización del banco de datos personales en el Registro
      Nacional de Protección de Datos Personales.
- [ ] Si corresponde designar un Oficial de Protección de Datos Personales
      conforme al D.S. 016-2024-JUS, vigente desde el 30 de marzo de 2025.
- [ ] Encargados de tratamiento realmente contratados (hosting, servicio de
      formularios, analítica), para nombrarlos con precisión.

## 8. Libro de Reclamaciones: qué está resuelto y qué no

**Resuelto.** Formulario con todos los campos que exige el Decreto Supremo
011-2011-PCM, identificación visible del proveedor, definición de reclamo y
queja, código correlativo y sello de fecha y hora generados en el servidor (no
manipulables desde el navegador), envío del registro completo al correo del
estudio, constancia en pantalla que el consumidor imprime o guarda en PDF con
un botón, y aviso del plazo legal de quince días hábiles improrrogables
conforme a la Ley 29571 modificada por la Ley 31435.

**No resuelto, por decisión de alcance.** Sin base de datos no hay panel de
consulta interno ni correlatividad estrictamente secuencial: el correlativo es
creciente y único, basado en la marca de tiempo. El registro persistente es el
correo en la bandeja del estudio más la constancia del consumidor.

Si el estudio quiere el panel interno, la numeración secuencial estricta y el
envío automático de la copia al correo del consumidor, hace falta una base de
datos. La ruta más simple es agregar Postgres o Supabase al proyecto y guardar
el registro antes de enviar el correo. Es una etapa acotada, pero implica un
costo mensual y una decisión sobre dónde se almacenan datos personales de
terceros.
