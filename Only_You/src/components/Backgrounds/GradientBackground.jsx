import React from "react";

const GradientBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "#050505", // Fondo base de seguridad
        overflow: "hidden", // Vital: oculta lo que sobra del cuadrado gigante
      }}>
      {/* EL DEGRADADO GIGANTE */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          // Usamos 'vmax' (el lado más largo de la pantalla) x 2
          // Esto asegura que al girar, las esquinas nunca se vean vacías.
          width: "200vmax",
          height: "200vmax",

          // Centramos el eje de rotación
          transform: "translate(-50%, -50%)",

          // Tu degradado original (De morado #8629b1 a rosa #f700ff)
          // Lo ponemos vertical (to bottom) porque al girar la caja, la dirección cambiará sola.
          background: "linear-gradient(to bottom, #b117f8, #2c0b2e)",
          // Animación de rotación suave e infinita
          animation: "spinGradient 20s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default GradientBackground;
