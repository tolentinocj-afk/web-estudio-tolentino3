"use client";

/* ==========================================================================
   Reveal · aparición progresiva al entrar en pantalla
   --------------------------------------------------------------------------
   Motivo de la animación: secuencia de lectura. El contenido llega en el
   orden en que se lee, no todo de golpe. Se ejecuta una sola vez por bloque.

   Usa IntersectionObserver, nunca un escucha de scroll: el navegador avisa
   cuando el elemento entra, en lugar de preguntar en cada cuadro.

   La preferencia de movimiento reducido se respeta desde globals.css.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  /* Si el navegador no soporta IntersectionObserver, el bloque nace visible.
     Se resuelve en el estado inicial y no dentro del efecto, para no provocar
     un segundo renderizado en cadena. */
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observador.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -56px 0px" },
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`aparece ${visible ? "visible" : ""} ${className}`}
      style={{ "--retardo": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
