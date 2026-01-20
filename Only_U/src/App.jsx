import React, { useState, useEffect } from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import MainContent from "./components/Layout/MainContent";
import BackgroundController from "./components/Backgrounds/BackgroundController";
import StaggeredMenu from "./components/UI/StaggeredMenu";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";

// Importamos el contenedor de la tienda, efectos y UI
import ShopContainer from "./components/Shop/ShopContainer";
import TrailSystem from "./components/Effects/TrailSystem";
import LoadingScreen from "./components/UI/LoadingScreen";

// CONFIGURACIÓN DEL MENÚ
const shopItems = [
  { id: "backgrounds", label: "Fondos", ariaLabel: "Galería de Fondos" },
  { id: "cursors", label: "Cursores", ariaLabel: "Personalizar Cursor" },
  { id: "trails", label: "Mascotas", ariaLabel: "Personalizar Mascota" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com" },
  { label: "Instagram", link: "https://instagram.com" },
];

function App() {
  // 1. Traemos performanceMode del store
  const { isUnlocked, openShop } = useGameStore();

  const handleMenuClick = (itemId) => {
    if (itemId) {
      openShop(itemId);
    }
  };

  // --- LÓGICA DE CARGA ---
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}>
      {/* 0. PANTALLA DE CARGA */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" progress={progress} />}
      </AnimatePresence>

      {/* 1. EL CANDADO */}
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

      {/* 2. EL CONTENIDO PRINCIPAL */}
      {isUnlocked && (
        <motion.div
          className="app-content"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* FONDO CONTROLADO */}
          <BackgroundController />
          {/* MENÚ STAGGERED */}
          <StaggeredMenu
            items={shopItems}
            socialItems={socialItems}
            isFixed={true}
            position="right"
            onItemClick={handleMenuClick}
            colors={["#f700ff", "#bd71ff", "#8629b1"]}
            accentColor="#f700ff"
            menuButtonColor="#fff"
            openMenuButtonColor="#ffffff"
            displayItemNumbering={true}
            logoUrl={null}
          />

          {/* RESTO DE COMPONENTES */}
          <ShopContainer />
          <TrailSystem />
          <MainContent />
        </motion.div>
      )}
    </main>
  );
}

export default App;
