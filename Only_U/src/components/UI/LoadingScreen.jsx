import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../styles/LoadingScreen.scss";

const LOADING_MESSAGES = [
  "Alineando las estrellas...",
  "Despertando a los gatos...",
  "Cargando recuerdos...",
  "Preparando el universo...",
];

const LoadingScreen = ({ progress }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500); // Cambia de frase cada 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-screen"
      exit={{
        opacity: 0,
        pointerEvents: "none", // ¡CLAVE! Permite hacer click mientras se desvanece
        transition: { duration: 0.8, ease: "easeInOut" },
      }}>
      <div className="loading-background-effect" />

      <div className="loading-content">
        <h1 className="loading-title">ONLY YOU</h1>

        <div className="progress-wrapper">
          <div className="progress-info">
            <span className="loading-label">Cargando sistema</span>
            <span className="loading-percent">{progress}%</span>
          </div>

          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
        </div>

        <div className="message-container">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="loading-message">
            {LOADING_MESSAGES[messageIndex]}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
