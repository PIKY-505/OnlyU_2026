import React, { useRef, useEffect } from "react";

const Silk = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.fillStyle = "#000000"; // Fondo negro
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255, 153, 204, 0.5)"; // Color del hilo (tu rosa accent)
      ctx.lineWidth = 1;

      for (let i = 0; i < 50; i++) {
        // Cantidad de hilos
        ctx.beginPath();
        for (let x = 0; x < width; x += 20) {
          // Fórmula matemática para crear ondas suaves (Seda)
          const y =
            height / 2 +
            Math.sin(x * 0.01 + t + i * 0.05) * 50 +
            Math.sin(x * 0.005 + t * 0.5) * 50;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.02; // Velocidad
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1, // Se queda detrás del formulario
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default Silk;
