import React from "react";
import { useGameStore } from "../../store/useStore";
import GradientBackground from "./GradientBackground";
import Galaxy from "./Galaxy";
import Silk from "./Silk";
import Ballpit from "./Ballpit";
import FloatingLines from "./FloatingLines";
import LightPillars from "./LightPillars";
import { AnimatePresence, motion } from "framer-motion";

// FIX: Constante fuera del componente para evitar que se reinicie la animación al re-renderizar
const FLOATING_LINES_COLORS = ["#f700ff", "#bd71ff", "#29b1ff"];

const BackgroundController = () => {
  const { activeBackground } = useGameStore();

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <AnimatePresence mode="wait">
        {/* CASO 1: GRADIENTE */}
        {activeBackground === "gradient" && (
          <motion.div
            key="gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0 }}>
            <GradientBackground />
          </motion.div>
        )}

        {/* CASO 2: GALAXY (SIEMPRE LIGERO) */}
        {activeBackground === "galaxy" && (
          <motion.div
            key="galaxy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: "absolute", inset: 0, background: "#050010" }}>
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={1}
              glowIntensity={0.5}
              saturation={1}
              hueShift={110}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              starSpeed={0.5}
              speed={0.5}
            />
          </motion.div>
        )}

        {/* CASO 3: SILK */}
        {activeBackground === "silk" && (
          <motion.div
            key="silk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0 }}>
            <Silk
              speed={4}
              scale={1}
              color="#9726fa"
              noiseIntensity={1.5}
              rotation={0}
            />
          </motion.div>
        )}

        {/* CASO 4: BALLPIT */}
        {activeBackground === "ballpit" && (
          <motion.div
            key="ballpit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#111111" }}>
            {" "}
            {/* <--- CAMBIA EL COLOR DE FONDO AQUÍ */}
            <Ballpit
              count={60}
              gravity={0.1}
              friction={0.995}
              wallBounce={0.9}
              followCursor={
                false
              } /* Cambia a false si no quieres que sigan al ratón */
              colors={[
                "#f700ff",
                "#bd71ff",
                "#29b1ff",
              ]} /* Añade o cambia colores Hex aquí */
            />
          </motion.div>
        )}

        {/* CASO 5: FLOATING LINES */}
        {activeBackground === "floatinglines" && (
          <motion.div
            key="floatinglines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <FloatingLines
              linesGradient={FLOATING_LINES_COLORS}
              lineCount={6}
              lineDistance={5}
              animationSpeed={0.5}
            />
          </motion.div>
        )}
        {/* CASO 6: LIGHT PILLARS */}
        {activeBackground === "lightpillars" && (
          <motion.div
            key="lightpillars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000000" }}>
            <LightPillars
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={1}
              rotationSpeed={0.3}
              glowAmount={0.005}
              pillarWidth={2.5}
              pillarHeight={0.4}
              noiseIntensity={0.7}
              pillarRotation={293}
              interactive={false}
              mixBlendMode="lighten"
              quality="high"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundController;
