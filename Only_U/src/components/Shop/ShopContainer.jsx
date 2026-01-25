import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/useStore";
import {
  FiX,
  FiCheck,
  FiImage,
  FiMousePointer,
  FiSlash,
  FiHeart,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/ShopContainer.scss";

// --- ASSETS PARA PREVIEW ---
import appleCat from "../../assets/trails/apple-cat.gif";
import jumpCat from "../../assets/trails/jump-cat.gif";
import rollingCat from "../../assets/trails/rolling-cat.gif";
import duck from "../../assets/trails/duck.png";
import pompom from "../../assets/trails/pompom.png";
import skeletonRun from "../../assets/trails/skeleton-run.gif";

// --- BASE DE DATOS DE LA TIENDA ---
const SHOP_DATA = {
  backgrounds: [
    {
      id: "gradient",
      name: "Original Gradient",
      description: "El clásico atemporal.",
      price: "Gratis",
      previewColor: "linear-gradient(45deg, #8629b1, #f700ff)",
    },
    {
      id: "galaxy",
      name: "Galaxy",
      description: "Un viaje a las estrellas.",
      price: "Gratis",
      previewColor: "#000", // Placeholder negro
    },
    {
      id: "silk",
      name: "Silk",
      description: "Suavidad y elegancia.",
      price: "Gratis",
      previewColor: "#ff99cc",
    },
    {
      id: "ballpit",
      name: "Ball Pit",
      description: "Física interactiva y relajante.",
      price: "Gratis",
      previewColor: "#29b1ff",
    },
    {
      id: "floatinglines",
      name: "Floating Lines",
      description: "Ondas de energía interactivas.",
      price: "Gratis",
      previewColor: "#bd71ff",
    },
    {
      id: "lightpillars",
      name: "Light Pillars",
      description: "Pilares de luz etéreos.",
      price: "Gratis",
      previewColor: "#00ffff",
    },
  ],
  cursors: [
    {
      id: "default",
      name: "Ratón Estándar",
      description: "El cursor de toda la vida.",
      price: "Gratis",
      previewColor: "transparent",
      icon: <FiMousePointer />,
    },
  ],
  trails: [
    {
      id: "none",
      name: "Ninguno",
      description: "Sin rastro, limpio y rápido.",
      price: "Gratis",
      previewColor: "transparent",
      icon: <FiSlash />,
    },
    {
      id: "apple-cat",
      name: "Gato Manzana",
      description: "Un gatito adorable en una manzana.",
      price: "Gratis",
      previewColor: "#ffadad",
      icon: <img src={appleCat} alt="Apple Cat" style={{ width: "40px" }} />,
    },
    {
      id: "jump-cat",
      name: "Gato Saltarín",
      description: "Siempre lleno de energía.",
      price: "Gratis",
      previewColor: "#a89c8d",
      icon: <img src={jumpCat} alt="Jump Cat" style={{ width: "40px" }} />,
    },
    {
      id: "rolling-cat",
      name: "Gato Rodante",
      description: "Rodando hacia tu corazón.",
      price: "Gratis",
      previewColor: "#ffecb6",
      icon: (
        <img src={rollingCat} alt="Rolling Cat" style={{ width: "40px" }} />
      ),
    },
    {
      id: "duck",
      name: "Pato",
      description: "Cuack cuack.",
      price: "Gratis",
      previewColor: "#ebe371",
      icon: <img src={duck} alt="Duck" style={{ width: "40px" }} />,
    },
    {
      id: "pompom",
      name: "Pompom",
      description: "Suave y esponjoso.",
      price: "Gratis",
      previewColor: "#e3e4b2",
      icon: <img src={pompom} alt="Pompom" style={{ width: "40px" }} />,
    },
    {
      id: "skeleton-run",
      name: "Esqueleto",
      description: "Spooky scary skeletons.",
      price: "Gratis",
      previewColor: "#a3a3a3",
      icon: <img src={skeletonRun} alt="Skeleton" style={{ width: "40px" }} />,
    },
  ],
};

const TABS = [
  { id: "backgrounds", label: "Fondos", icon: <FiImage /> },
  { id: "cursors", label: "Cursores", icon: <FiMousePointer /> },
  { id: "trails", label: "Mascotas", icon: <FiHeart /> },
];

const ShopContainer = () => {
  const {
    activeShop,
    openShop,
    closeShop,
    // Estados de equipamiento
    activeBackground,
    setBackground,
    activeCursor,
    setCursor,
    activeTrail,
    setTrail,
  } = useGameStore();

  // --- TRUCO PARA ANIMACIÓN DE SALIDA ---
  // Guardamos la última tienda activa para mostrarla mientras se cierra (fade out)
  const [displayShop, setDisplayShop] = useState(activeShop);

  useEffect(() => {
    if (activeShop) {
      setDisplayShop(activeShop);
    }
  }, [activeShop]);

  // Usamos 'displayShop' para los datos, así no crashea al cerrar
  const currentItems = SHOP_DATA[displayShop] || [];

  const handleEquip = (itemId) => {
    if (activeShop === "backgrounds") setBackground(itemId);
    if (activeShop === "cursors") setCursor(itemId);
    if (activeShop === "trails") setTrail(itemId);

    // ¡HEMOS QUITADO EL closeShop() AQUÍ!
    // Ahora la tienda sigue abierta para que sigas comprando.
  };

  const isEquipped = (itemId) => {
    if (activeShop === "backgrounds") return activeBackground === itemId;
    if (activeShop === "cursors") return activeCursor === itemId;
    if (activeShop === "trails") return activeTrail === itemId;
    return false;
  };

  return (
    <AnimatePresence>
      {/* Solo renderizamos si activeShop tiene valor (está abierta) */}
      {activeShop && (
        <motion.div
          className="shop-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }} // Salida suave del fondo
        >
          {/* Al hacer click en el fondo (overlay), cerramos la tienda */}
          <div
            className="click-outside-layer"
            onClick={closeShop}
            style={{ position: "absolute", inset: 0 }}
          />

          <motion.div
            className="shop-window"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{
              scale: 0.95,
              y: 10,
              opacity: 0,
              transition: { duration: 0.2 },
            }} // Salida pop-out de la ventana
          >
            {/* CABECERA */}
            <div className="shop-header-row">
              <div className="shop-tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => openShop(tab.id)}
                    className={`tab-btn ${activeShop === tab.id ? "active" : ""}`}>
                    {tab.icon}
                    <span>{tab.label}</span>
                    {activeShop === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="active-line"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button onClick={closeShop} className="close-btn">
                <FiX />
              </button>
            </div>

            <div className="shop-section-title">
              Catálogo de{" "}
              {displayShop === "backgrounds"
                ? "Fondos"
                : displayShop === "cursors"
                  ? "Cursores"
                  : "Mascotas"}
            </div>

            {/* GRILLA */}
            <div className="shop-grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayShop}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "grid",
                    // Aquí ajustamos el tamaño: 180px es perfecto para que entren 3
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px",
                    width: "100%", // Vital para que ocupe todo el ancho disponible
                  }}>
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`shop-item ${isEquipped(item.id) ? "equipped" : ""}`}
                      onClick={() => handleEquip(item.id)}>
                      <div
                        className="item-preview"
                        style={{ background: item.previewColor }}>
                        {item.icon && (
                          <div className="preview-icon">{item.icon}</div>
                        )}

                        {isEquipped(item.id) && (
                          <div className="check-badge">
                            <FiCheck />
                          </div>
                        )}
                      </div>

                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <span className="price-tag">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShopContainer;
