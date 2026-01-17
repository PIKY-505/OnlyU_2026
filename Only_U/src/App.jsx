import React from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import MainContent from "./components/Layout/MainContent";
import GradientBackground from "./components/Backgrounds/GradientBackground";
import StaggeredMenu from "./components/UI/StaggeredMenu";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";
// Importamos el contenedor de la tienda
import ShopContainer from "./components/Shop/ShopContainer";

// CONFIGURACIÓN DEL MENÚ
const shopItems = [
  // AÑADIMOS IDs: Importante para saber qué tienda abrir
  { id: "backgrounds", label: "Fondos", ariaLabel: "Galería de Fondos" },
  { id: "cursors", label: "Cursores", ariaLabel: "Personalizar Cursor" },
  { id: "trails", label: "Mascotas", ariaLabel: "Personalizar Mascota" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com" },
  { label: "Instagram", link: "https://instagram.com" },
];

function App() {
  // 1. Traemos la función openShop del store
  const { isUnlocked, openShop } = useGameStore();

  // 2. Función para manejar los clics del menú
  const handleMenuClick = (itemId) => {
    if (itemId) {
      openShop(itemId); // Abre la tienda correspondiente ('backgrounds', etc.)
    }
  };

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}>
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
          <div className="layer-background">
            <GradientBackground />
          </div>

          {/* MENÚ STAGGERED */}
          <StaggeredMenu
            items={shopItems}
            socialItems={socialItems}
            isFixed={true}
            position="right"
            // CONECTAMOS EL CLIC: Pasamos la función manejadora
            onItemClick={handleMenuClick}
            colors={["#f700ff", "#bd71ff", "#8629b1"]}
            accentColor="#f700ff"
            menuButtonColor="#fff"
            openMenuButtonColor="#ffffff"
            displayItemNumbering={true}
            logoUrl={null}
          />

          {/* 3. EL CONTENEDOR DE LA TIENDA (Aparecerá cuando activeShop no sea null) */}
          <ShopContainer />

          <MainContent />
        </motion.div>
      )}
    </main>
  );
}

export default App;
