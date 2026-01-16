import React from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import MainContent from "./components/Layout/MainContent"; // <--- IMPORTAMOS
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";

function App() {
  const { isUnlocked, activeBackground } = useGameStore();

  return (
    <main>
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              transition: { duration: 0.8 },
            }}
            style={{ position: "fixed", zIndex: 9999, inset: 0 }}>
            <LockScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {isUnlocked && (
        <motion.div
          className="app-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Esperamos un poco a que se vaya el candado
          style={{ width: "100vw", height: "100vh", position: "relative" }}>
          {/* CAPA 1: FONDO (Aquí irán tus fondos cambiantes luego) */}
          <div
            className="layer-background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              // Pongo un gradiente temporal para que veas el efecto cristal
              background:
                "linear-gradient(45deg, #bf10f5 0%, #fad0c4 99%, #fad0c4 100%)",
            }}>
            {/* Aquí renderizaremos el componente de fondo activo más adelante */}
          </div>

          {/* CAPA 2: CONTENIDO PRINCIPAL */}
          <MainContent />
        </motion.div>
      )}
    </main>
  );
}

export default App;
