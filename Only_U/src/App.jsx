import React from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import MainContent from "./components/Layout/MainContent";
import GradientBackground from "./components/Backgrounds/GradientBackground"; // <--- IMPORTAR
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";

function App() {
  const { isUnlocked } = useGameStore(); // 'activeBackground' no se usa por ahora

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}>
      {/* 1. EL CANDADO (Capa Superior) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 2 },
            }}
            style={{ position: "fixed", zIndex: 9999, inset: 0 }}>
            <LockScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. EL CONTENIDO PRINCIPAL (Capa Inferior) */}
      {isUnlocked && (
        <motion.div
          className="app-content"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* CAPA DE FONDO */}
          {/* Aquí ponemos el componente nuevo que rota */}
          <div className="layer-background">
            <GradientBackground />
          </div>

          {/* CONTENIDO (Tarjeta de cristal) */}
          <MainContent />
        </motion.div>
      )}
    </main>
  );
}

export default App;
