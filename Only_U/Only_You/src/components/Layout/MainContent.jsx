import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "../UI/ShinyText"; // Reutilizamos tu texto brillante
import "../../styles/MainContent.scss";

// Carga dinámica de imágenes desde la carpeta assets/photos
const photoModules = import.meta.glob(
  "../../assets/img/photos/*.{png,jpg,jpeg,gif,webp}",
  {
    eager: true,
  },
);
const photos = Object.values(photoModules).map((module) => module.default);

const MainContent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lógica para asegurar scroll infinito suave:
  // 1. Si hay pocas fotos, las repetimos hasta tener una base sólida (min 10 items)
  let baseList = [...photos];
  if (baseList.length > 0) {
    while (baseList.length < 18) {
      baseList = [...baseList, ...photos];
    }
  }
  // 2. Duplicamos la lista base para el loop perfecto (0% -> -50%)
  const displayPhotos = [...baseList, ...baseList];

  return (
    <div className="main-container">
      {/* Estilos inyectados para la galería */}
      <style>{`
        .gallery-container {
          margin-top: 0; /* El espaciado lo controla el contenedor padre ahora */
          width: 100%;
          overflow: hidden;
          position: relative;
          flex-shrink: 0; /* IMPORTANTE: Evita que la galería se aplaste o corte */
          /* Máscara para desvanecer los bordes suavemente */
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .gallery-track {
          display: flex;
          align-items: center;
          gap: 15px;
          width: max-content;
          animation: scrollLeft 60s linear infinite; /* Más lento (60s) */
          padding: 30px 0; /* Espacio vertical para evitar recortes al hacer hover */
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
        .gallery-item {
          height: 220px;
          width: 150px; /* Ancho fijo para consistencia total */
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }
        .gallery-item:hover {
          transform: scale(1.15);
          border-color: #f700ff;
          box-shadow: 0 0 25px rgba(247, 0, 255, 0.5);
          z-index: 10;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* TARJETA DE CRISTAL (Glass Card) */}
      <div className="glass-card">
        {/* CABECERA */}
        <header>
          {/* Título Lorem Ipsum */}
          <h1>Lorem Ipsum</h1>
          <div className="subtitle">
            Dolor sit amet, consectetur adipiscing elit
          </div>
        </header>

        {/* CUERPO DEL TEXTO */}
        <div className="content-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>

      {/* GALERÍA DE FOTOS (AHORA FUERA DE LA TARJETA) */}
      {photos.length > 0 && (
        <div className="gallery-container">
          <div className="gallery-track">
            {displayPhotos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Memory ${index}`}
                className="gallery-item"
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX (VISOR DE FOTOS) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "zoom-out",
            }}>
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                maxHeight: "85vh",
                maxWidth: "90vw",
                borderRadius: "16px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer click en la foto
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainContent;
