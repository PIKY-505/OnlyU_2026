import React from "react";
import { useGameStore } from "../../store/useStore";
import GradientBackground from "./GradientBackground";
import Galaxy from "./Galaxy";
import Silk from "./Silk";
import Ballpit from "./Ballpit";
import FloatingLines from "./FloatingLines";
import LightPillars from "./LightPillars";
import PixelSnow from "./PixelSnow";
import { AnimatePresence, motion } from "framer-motion";

const BackgroundController = ({
  floatingLinesConfig: propFlConfig,
  lightPillarsConfig: propLpConfig,
  ballpitConfig: propBpConfig,
  silkConfig: propSilkConfig,
  galaxyConfig: propGalaxyConfig,
  gradientConfig: propGradientConfig,
  pixelSnowConfig: propPixelSnowConfig,
}) => {
  // Leemos la configuración del store (si existe)
  const {
    activeBackground,
    floatingLinesConfig: storeFlConfig,
    lightPillarsConfig: storeLpConfig,
    ballpitConfig: storeBpConfig,
    silkConfig: storeSilkConfig,
    galaxyConfig: storeGalaxyConfig,
    gradientConfig: storeGradientConfig,
    pixelSnowConfig: storePixelSnowConfig,
  } = useGameStore();

  // Prioridad: Props (desde App) > Store > Default
  const floatingLinesConfig = propFlConfig || storeFlConfig;
  const lightPillarsConfig = propLpConfig || storeLpConfig;
  const ballpitConfig = propBpConfig || storeBpConfig;
  const silkConfig = propSilkConfig || storeSilkConfig;
  const galaxyConfig = propGalaxyConfig || storeGalaxyConfig;
  const gradientConfig = propGradientConfig || storeGradientConfig;
  const pixelSnowConfig = propPixelSnowConfig || storePixelSnowConfig;

  // Configuración por defecto (Fallback)
  const flConfig = floatingLinesConfig || {
    colors: ["#f700ff", "#bd71ff", "#29b1ff"],
    count: 6,
    distance: 5,
    bendRadius: 5,
    bendStrength: -0.5,
    enabledWaves: ["top", "middle", "bottom"],
    interactive: false,
  };

  // Configuración por defecto para LightPillars
  const lpConfig = lightPillarsConfig || {
    topColor: "#5227FF",
    bottomColor: "#FF9FFC",
    intensity: 1,
    rotationSpeed: 0.3,
    pillarWidth: 3,
    pillarHeight: 0.4,
    noiseIntensity: 0.5,
    pillarRotation: 293,
    interactive: false,
    glowAmount: 0.002,
    quality: "high",
  };

  // Configuración por defecto para Ballpit
  const bpConfig = ballpitConfig || {
    colors: ["#f700ff", "#bd71ff", "#29b1ff"],
    count: 60,
    gravity: 0.1,
    friction: 0.995,
    wallBounce: 0.9,
    followCursor: false,
  };

  // Configuración por defecto para Silk
  const sConfig = silkConfig || {
    color: "#9726fa",
    speed: 4,
    scale: 1,
    noiseIntensity: 1.5,
    rotation: 0,
  };

  // Configuración por defecto para Galaxy
  const gConfig = galaxyConfig || {
    density: 1,
    glowIntensity: 0.5,
    saturation: 1,
    hueShift: 110,
    twinkleIntensity: 0.3,
    rotationSpeed: 0.1,
    starSpeed: 0.5,
    speed: 0.5,
  };

  // Configuración por defecto para Gradient
  const gradConfig = gradientConfig || {
    color1: "#b117f8",
    color2: "#2c0b2e",
    speed: 20,
  };

  // Configuración por defecto para PixelSnow
  const psConfig = pixelSnowConfig || {
    color: "#ffffff",
    flakeSize: 0.01, // Mucho más pequeño para alejarlo
    minFlakeSize: 0.6, // Reducido para permitir copos lejanos
    pixelResolution: 800, // Mayor resolución = píxeles más pequeños
    speed: 1.9,
    density: 0.45,
    direction: 100,
    brightness: 1.5,
    depthFade: 3,
    farPlane: 50,
    gamma: 0.4545,
    variant: "snowflake",
  };

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
            <GradientBackground
              color1={gradConfig.color1}
              color2={gradConfig.color2}
              speed={gradConfig.speed}
            />
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
              density={gConfig.density}
              glowIntensity={gConfig.glowIntensity}
              saturation={gConfig.saturation}
              hueShift={gConfig.hueShift}
              twinkleIntensity={gConfig.twinkleIntensity}
              rotationSpeed={gConfig.rotationSpeed}
              starSpeed={gConfig.starSpeed}
              speed={gConfig.speed}
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
              speed={sConfig.speed}
              scale={sConfig.scale}
              color={sConfig.color}
              noiseIntensity={sConfig.noiseIntensity}
              rotation={sConfig.rotation}
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
              count={bpConfig.count}
              gravity={bpConfig.gravity}
              friction={bpConfig.friction}
              wallBounce={bpConfig.wallBounce}
              followCursor={bpConfig.followCursor}
              colors={bpConfig.colors}
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
              linesGradient={flConfig.colors}
              lineCount={flConfig.count}
              lineDistance={flConfig.distance}
              animationSpeed={0.5}
              bendRadius={flConfig.bendRadius}
              bendStrength={flConfig.bendStrength}
              enabledWaves={flConfig.enabledWaves}
              interactive={flConfig.interactive ?? false}
              parallax={flConfig.parallax ?? false}
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
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <LightPillars
              topColor={lpConfig.topColor}
              bottomColor={lpConfig.bottomColor}
              intensity={lpConfig.intensity}
              rotationSpeed={lpConfig.rotationSpeed}
              glowAmount={lpConfig.glowAmount ?? 0.002}
              pillarWidth={lpConfig.pillarWidth}
              pillarHeight={lpConfig.pillarHeight}
              noiseIntensity={lpConfig.noiseIntensity}
              pillarRotation={lpConfig.pillarRotation}
              interactive={lpConfig.interactive ?? true}
              quality={lpConfig.quality ?? "high"}
            />
          </motion.div>
        )}

        {/* CASO 7: PIXEL SNOW */}
        {activeBackground === "pixelsnow" && (
          <motion.div
            key="pixelsnow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, background: "#000" }}>
            <PixelSnow
              color={psConfig.color}
              flakeSize={psConfig.flakeSize}
              minFlakeSize={psConfig.minFlakeSize}
              pixelResolution={psConfig.pixelResolution}
              speed={psConfig.speed}
              density={psConfig.density}
              direction={psConfig.direction}
              brightness={psConfig.brightness}
              variant={psConfig.variant}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundController;
