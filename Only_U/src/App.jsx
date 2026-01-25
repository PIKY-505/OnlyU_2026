import React, { useState, useEffect } from "react";
import { useGameStore } from "./store/useStore";
import LockScreen from "./components/Layout/LockScreen";
import MainContent from "./components/Layout/MainContent";
import BackgroundController from "./components/Backgrounds/BackgroundController";
import StaggeredMenu from "./components/UI/StaggeredMenu";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/main.scss";

// 1. IMPORTAMOS EL DOCK Y LOS ICONOS
import Dock from "./components/UI/Dock";
import { FiStar, FiMusic, FiPlayCircle, FiEdit, FiLock } from "react-icons/fi";

import ShopContainer from "./components/Shop/ShopContainer";
import TrailSystem from "./components/Effects/TrailSystem";
import LoadingScreen from "./components/UI/LoadingScreen";
import MusicPlayer from "./components/UI/MusicPlayer";

// CONFIGURACIÓN DEL MENÚ LATERAL
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
  const { isUnlocked, openShop, closeShop, lockGame } = useGameStore();
  const [showInfo, setShowInfo] = useState(true);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  const handleMenuClick = (itemId) => {
    if (itemId) {
      openShop(itemId);
    }
  };

  // --- 2. DEFINICIÓN DE LOS ÍTEMS DEL DOCK (ESTO FALTABA) ---
  const dockItems = [
    {
      icon: <FiStar size={22} />,
      label: "Texto",
      onClick: () => setShowInfo(!showInfo),
    },
    {
      icon: <FiMusic size={22} />,
      label: "Música",
      onClick: () => setShowMusicPlayer(!showMusicPlayer),
    },
    {
      icon: <FiPlayCircle size={22} />,
      label: "Juego",
      onClick: () => console.log("Toggle Game"),
    },
    {
      icon: <FiEdit size={22} />,
      label: "Fondo",
      onClick: () => console.log("Personalize Background"),
    },
    {
      icon: <FiLock size={22} />,
      label: "Bloquear",
      onClick: () => {
        if (lockGame) {
          closeShop(); // Cerramos la tienda si estaba abierta
          setShowMusicPlayer(false); // Cerramos el reproductor visualmente
          lockGame(); // Bloqueamos la app
        }
      },
    },
  ];

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
            // ESTILO COPIADO DEL DESBLOQUEO (Invertido para la entrada)
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(20px)",
              scale: 1.1,
              transition: { duration: 2 },
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: "fixed",
              zIndex: 9999,
              inset: 0,
              background: "#000", // Fondo sólido para tapar la app limpiamente
            }}>
            <LockScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. EL CONTENIDO PRINCIPAL */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            key="main-content"
            className="app-content"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              // ESTILO COPIADO DE LA ENTRADA (Simétrico)
              scale: 1.1,
              filter: "blur(10px)",
              transition: { duration: 1 },
            }}
            transition={{ duration: 1 }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
            {/* FONDO CONTROLADO */}
            <BackgroundController />

            {/* MENÚ STAGGERED (Lateral) */}
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
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                  }}>
                  <MainContent />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. REPRODUCTOR DE MÚSICA (Siempre montado para persistencia) */}
            <MusicPlayer
              visible={showMusicPlayer}
              onClose={() => setShowMusicPlayer(false)}
            />

            {/* 3. DOCK (Barra inferior) */}
            <Dock
              items={dockItems}
              panelHeight={60}
              baseItemSize={45}
              magnification={60}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
