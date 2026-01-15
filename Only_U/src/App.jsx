import React from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import { AnimatePresence, motion } from "framer-motion"; // Importación clave
import "./styles/main.scss";

function App() {
  const { isUnlocked, coins, activeBackground } = useGameStore();

  return (
    <main>
      <AnimatePresence mode="wait">
        {/* SI ESTÁ BLOQUEADO: Muestra LockScreen con animación de salida */}
        {!isUnlocked && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 3 },
            }}
            style={{ position: "fixed", zIndex: 9999, inset: 0 }}>
            <LockScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* EL CONTENIDO PRINCIPAL (Siempre está renderizado detrás, esperando) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}>
          {/* CAPA 1: FONDOS */}
          <div className="layer-background">
            {activeBackground === "default" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#fff2e6",
                }}></div>
            )}
          </div>

          {/* CAPA 2: JUEGO */}
          <div className="layer-game"></div>

          {/* CAPA 3: UI */}
          <div className="layer-ui">
            <div className="interactive" style={{ padding: 20 }}>
              <h1>Bienvenida, mi vida ❤️</h1>
              <p>Monedas: {coins}</p>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default App;
