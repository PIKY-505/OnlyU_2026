import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Usamos 'framer-motion' que es la versión estable que tienes instalada
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import "../../styles/Dock.scss";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    // Si no hay referencia, devolvemos una distancia enorme para que no reaccione
    if (!ref.current) return Infinity;

    // Obtenemos el rectángulo del elemento en el DOM
    const rect = ref.current.getBoundingClientRect();

    // Calculamos el centro X del elemento
    const elementCenterX = rect.x + rect.width / 2;

    // Devolvemos la distancia absoluta (sin signo) para evitar errores de cálculo
    return Math.abs(val - elementCenterX);
  });

  // Transformamos la distancia en tamaño
  // Si la distancia es 0 (ratón encima), tamaño = magnification
  // Si la distancia es 'distance' (ej: 150px), tamaño = baseItemSize
  const targetSize = useTransform(
    mouseDistance,
    [0, distance],
    [magnification, baseItemSize],
  );

  // ARREGLO 1: Físicas más "pesadas".
  // Al pasar el 'spring' desde el padre, asegúrate de que tenga suficiente 'damping'.
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        // ARREGLO 2: Forzamos min-width y min-height para que Flexbox no se vuelva loco
        minWidth: size,
        minHeight: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      aria-haspopup="true">
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Escuchamos los cambios del valor de animación
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 5, x: "-50%" }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ left: "50%", x: "-50%" }} // Centrado absoluto forzado
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  // --- CAMBIO AQUÍ: VELOCIDAD ---
  // mass: 0.1 (muy ligero)
  // stiffness: 300 (mucha tensión = vuelve rápido a su sitio)
  // damping: 20 (frena rápido sin rebotar eternamente)
  spring = { mass: 0.1, stiffness: 300, damping: 20 },

  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight],
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock">
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}>
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
