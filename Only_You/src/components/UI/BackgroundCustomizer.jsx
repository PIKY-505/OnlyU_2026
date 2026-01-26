import React from "react";
import { useGameStore } from "../../store/useStore";
import { FiX, FiCheck, FiRotateCcw } from "react-icons/fi";
import "../../styles/BackgroundCustomizer.scss";

const PRESETS = [
  { name: "Neon", colors: ["#f700ff", "#bd71ff", "#29b1ff"] },
  { name: "Fire", colors: ["#ff0000", "#ff7f00", "#ffff00"] },
  { name: "Matrix", colors: ["#00ff00", "#003300", "#ccffcc"] },
  { name: "Ice", colors: ["#00ffff", "#ffffff", "#0088ff"] },
  { name: "CMY", colors: ["#ff00ff", "#ffff00", "#00ffff"] },
];

// Valores por defecto para el botón de Reset
const DEFAULT_FL_CONFIG = {
  colors: PRESETS[0].colors,
  count: 6,
  distance: 5,
  bendRadius: 5,
  bendStrength: -0.5,
  enabledWaves: ["top", "middle", "bottom"],
  interactive: false,
};

const QUALITY_OPTIONS = [
  { label: "Baja", value: "low" },
  { label: "Media", value: "medium" },
  { label: "Alta", value: "high" },
];

const DEFAULT_LP_CONFIG = {
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

const DEFAULT_BP_CONFIG = {
  colors: ["#f700ff", "#bd71ff", "#29b1ff"],
  count: 60,
  gravity: 0.1,
  friction: 0.995,
  wallBounce: 0.9,
  followCursor: false,
};

const DEFAULT_SILK_CONFIG = {
  color: "#9726fa",
  speed: 4,
  scale: 1,
  noiseIntensity: 1.5,
  rotation: 0,
};

const DEFAULT_GALAXY_CONFIG = {
  density: 1,
  glowIntensity: 0.5,
  saturation: 1,
  hueShift: 110,
  twinkleIntensity: 0.3,
  rotationSpeed: 0.1,
  starSpeed: 0.5,
  speed: 0.5,
};

const DEFAULT_GRADIENT_CONFIG = {
  color1: "#b117f8",
  color2: "#2c0b2e",
  speed: 20,
};

const BackgroundCustomizer = ({
  onClose,
  floatingLinesConfig: propFlConfig,
  setFloatingLinesConfig: propSetFlConfig,
  lightPillarsConfig: propLpConfig,
  setLightPillarsConfig: propSetLpConfig,
  ballpitConfig: propBpConfig,
  setBallpitConfig: propSetBpConfig,
  silkConfig: propSilkConfig,
  setSilkConfig: propSetSilkConfig,
  galaxyConfig: propGalaxyConfig,
  setGalaxyConfig: propSetGalaxyConfig,
  gradientConfig: propGradientConfig,
  setGradientConfig: propSetGradientConfig,
}) => {
  // Asumimos que estas funciones existen en el store.
  const {
    activeBackground,
    floatingLinesConfig: storeFlConfig,
    setFloatingLinesConfig: storeSetFlConfig,
    lightPillarsConfig: storeLpConfig,
    setLightPillarsConfig: storeSetLpConfig,
    ballpitConfig: storeBpConfig,
    setBallpitConfig: storeSetBpConfig,
    silkConfig: storeSilkConfig,
    setSilkConfig: storeSetSilkConfig,
    galaxyConfig: storeGalaxyConfig,
    setGalaxyConfig: storeSetGalaxyConfig,
    gradientConfig: storeGradientConfig,
    setGradientConfig: storeSetGradientConfig,
  } = useGameStore();

  // Resolver configuración y setters (Props > Store)
  const floatingLinesConfig = propFlConfig || storeFlConfig;
  const setFloatingLinesConfig = propSetFlConfig || storeSetFlConfig;
  const lightPillarsConfig = propLpConfig || storeLpConfig;
  const setLightPillarsConfig = propSetLpConfig || storeSetLpConfig;
  const ballpitConfig = propBpConfig || storeBpConfig;
  const setBallpitConfig = propSetBpConfig || storeSetBpConfig;
  const silkConfig = propSilkConfig || storeSilkConfig;
  const setSilkConfig = propSetSilkConfig || storeSetSilkConfig;
  const galaxyConfig = propGalaxyConfig || storeGalaxyConfig;
  const setGalaxyConfig = propSetGalaxyConfig || storeSetGalaxyConfig;
  const gradientConfig = propGradientConfig || storeGradientConfig;
  const setGradientConfig = propSetGradientConfig || storeSetGradientConfig;

  // --- CONFIGURACIÓN FLOATING LINES ---
  const flConfig = floatingLinesConfig || DEFAULT_FL_CONFIG;

  const updateFlConfig = (key, value) => {
    if (setFloatingLinesConfig) {
      setFloatingLinesConfig({ ...flConfig, [key]: value });
    }
  };

  const toggleFlWave = (wave) => {
    const current = flConfig.enabledWaves;
    const next = current.includes(wave)
      ? current.filter((w) => w !== wave)
      : [...current, wave];
    updateFlConfig("enabledWaves", next);
  };

  const updateFlColor = (index, newColor) => {
    const newColors = [...flConfig.colors];
    newColors[index] = newColor;
    updateFlConfig("colors", newColors);
  };

  // --- CONFIGURACIÓN LIGHT PILLARS ---
  const lpConfig = lightPillarsConfig || DEFAULT_LP_CONFIG;

  const updateLpConfig = (key, value) => {
    if (setLightPillarsConfig) {
      setLightPillarsConfig({ ...lpConfig, [key]: value });
    } else {
      console.warn(
        "setLightPillarsConfig no está definido en el store. Asegúrate de agregarlo.",
      );
    }
  };

  // --- CONFIGURACIÓN BALLPIT ---
  const bpConfig = ballpitConfig || DEFAULT_BP_CONFIG;

  const updateBpConfig = (key, value) => {
    if (setBallpitConfig) {
      setBallpitConfig({ ...bpConfig, [key]: value });
    }
  };

  const updateBpColor = (index, newColor) => {
    const newColors = [...bpConfig.colors];
    newColors[index] = newColor;
    updateBpConfig("colors", newColors);
  };

  // --- CONFIGURACIÓN SILK ---
  const sConfig = silkConfig || DEFAULT_SILK_CONFIG;

  const updateSilkConfig = (key, value) => {
    if (setSilkConfig) {
      setSilkConfig({ ...sConfig, [key]: value });
    }
  };

  // --- CONFIGURACIÓN GALAXY ---
  const gConfig = galaxyConfig || DEFAULT_GALAXY_CONFIG;

  const updateGalaxyConfig = (key, value) => {
    if (setGalaxyConfig) {
      setGalaxyConfig({ ...gConfig, [key]: value });
    }
  };

  // --- CONFIGURACIÓN GRADIENT ---
  const gradConfig = gradientConfig || DEFAULT_GRADIENT_CONFIG;

  const updateGradientConfig = (key, value) => {
    if (setGradientConfig) {
      setGradientConfig({ ...gradConfig, [key]: value });
    }
  };

  // --- FUNCIÓN RESET ---
  const handleReset = () => {
    if (activeBackground === "floatinglines" && setFloatingLinesConfig) {
      setFloatingLinesConfig(DEFAULT_FL_CONFIG);
    } else if (activeBackground === "lightpillars" && setLightPillarsConfig) {
      setLightPillarsConfig(DEFAULT_LP_CONFIG);
    } else if (activeBackground === "ballpit" && setBallpitConfig) {
      setBallpitConfig(DEFAULT_BP_CONFIG);
    } else if (activeBackground === "silk" && setSilkConfig) {
      setSilkConfig(DEFAULT_SILK_CONFIG);
    } else if (activeBackground === "galaxy" && setGalaxyConfig) {
      setGalaxyConfig(DEFAULT_GALAXY_CONFIG);
    } else if (activeBackground === "gradient" && setGradientConfig) {
      setGradientConfig(DEFAULT_GRADIENT_CONFIG);
    }
  };

  return (
    <div className="bg-customizer-panel" style={{ pointerEvents: "auto" }}>
      <div className="bg-customizer-header">
        <h3>Personalizar Fondo</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleReset}
            className="reset-btn"
            title="Restaurar valores por defecto">
            <FiRotateCcw />
          </button>
          <button onClick={onClose} className="close-btn">
            <FiX />
          </button>
        </div>
      </div>

      <div className="bg-customizer-content">
        {/* --- CONTENIDO PARA FLOATING LINES --- */}
        {activeBackground === "floatinglines" && (
          <>
            <div className="section">
              <label>Presets de Color</label>
              <div className="presets-grid">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    className="preset-btn"
                    onClick={() => updateFlConfig("colors", preset.colors)}
                    style={{
                      background: `linear-gradient(to right, ${preset.colors[0]}, ${preset.colors[1]}, ${preset.colors[2]})`,
                    }}
                    title={preset.name}>
                    {JSON.stringify(flConfig.colors) ===
                      JSON.stringify(preset.colors) && <FiCheck />}
                  </button>
                ))}
              </div>
            </div>

            <div className="section">
              <label>Colores Personalizados</label>
              <div className="color-pickers">
                {flConfig.colors.map((color, idx) => (
                  <div key={idx} className="color-input-wrapper">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateFlColor(idx, e.target.value)}
                    />
                    <span className="hex-code">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <label>
                Cantidad de Líneas <span>{flConfig.count}</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={flConfig.count}
                onChange={(e) =>
                  updateFlConfig("count", parseInt(e.target.value))
                }
              />

              <label>
                Distancia entre Líneas <span>{flConfig.distance}</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={flConfig.distance}
                onChange={(e) =>
                  updateFlConfig("distance", parseInt(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>
                Radio de Curvatura <span>{flConfig.bendRadius}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={flConfig.bendRadius}
                onChange={(e) =>
                  updateFlConfig("bendRadius", parseFloat(e.target.value))
                }
              />

              <label>
                Fuerza de Curvatura <span>{flConfig.bendStrength}</span>
              </label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={flConfig.bendStrength}
                onChange={(e) =>
                  updateFlConfig("bendStrength", parseFloat(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>Capas Activas</label>
              <div className="toggles-row">
                {["top", "middle", "bottom"].map((wave) => (
                  <button
                    key={wave}
                    className={`toggle-btn ${
                      flConfig.enabledWaves.includes(wave) ? "active" : ""
                    }`}
                    onClick={() => toggleFlWave(wave)}>
                    {wave.charAt(0).toUpperCase() + wave.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="section">
              <label>Interacción</label>
              <button
                className={`toggle-btn ${flConfig.interactive !== false ? "active" : ""}`}
                onClick={() =>
                  updateFlConfig(
                    "interactive",
                    !(flConfig.interactive !== false),
                  )
                }
                style={{ width: "100%", textAlign: "center" }}>
                {flConfig.interactive !== false
                  ? "Activada (Ratón)"
                  : "Desactivada"}
              </button>
            </div>
          </>
        )}

        {/* --- CONTENIDO PARA LIGHT PILLARS --- */}
        {activeBackground === "lightpillars" && (
          <>
            <div className="section">
              <label>Colores</label>
              <div className="color-pickers">
                <div className="color-input-wrapper">
                  <label style={{ fontSize: "0.8rem", marginBottom: 5 }}>
                    Superior
                  </label>
                  <input
                    type="color"
                    value={lpConfig.topColor}
                    onChange={(e) => updateLpConfig("topColor", e.target.value)}
                  />
                </div>
                <div className="color-input-wrapper">
                  <label style={{ fontSize: "0.8rem", marginBottom: 5 }}>
                    Inferior
                  </label>
                  <input
                    type="color"
                    value={lpConfig.bottomColor}
                    onChange={(e) =>
                      updateLpConfig("bottomColor", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <label>
                Intensidad <span>{lpConfig.intensity}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={lpConfig.intensity}
                onChange={(e) =>
                  updateLpConfig("intensity", parseFloat(e.target.value))
                }
              />

              <label>
                Velocidad <span>{lpConfig.rotationSpeed}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={lpConfig.rotationSpeed}
                onChange={(e) =>
                  updateLpConfig("rotationSpeed", parseFloat(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>
                Ancho del Pilar <span>{lpConfig.pillarWidth}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={lpConfig.pillarWidth}
                onChange={(e) =>
                  updateLpConfig("pillarWidth", parseFloat(e.target.value))
                }
              />

              <label>
                Rotación <span>{lpConfig.pillarRotation}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={lpConfig.pillarRotation}
                onChange={(e) =>
                  updateLpConfig("pillarRotation", parseInt(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>
                Altura del Pilar <span>{lpConfig.pillarHeight}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={lpConfig.pillarHeight}
                onChange={(e) =>
                  updateLpConfig("pillarHeight", parseFloat(e.target.value))
                }
              />

              <label>
                Intensidad Ruido <span>{lpConfig.noiseIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lpConfig.noiseIntensity}
                onChange={(e) =>
                  updateLpConfig("noiseIntensity", parseFloat(e.target.value))
                }
              />

              <label>
                Resplandor <span>{lpConfig.glowAmount}</span>
              </label>
              <input
                type="range"
                min="0.0001"
                max="0.02"
                step="0.0001"
                value={lpConfig.glowAmount}
                onChange={(e) =>
                  updateLpConfig("glowAmount", parseFloat(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>Calidad</label>
              <div className="toggles-row">
                {QUALITY_OPTIONS.map((q) => (
                  <button
                    key={q.value}
                    className={`toggle-btn ${lpConfig.quality === q.value ? "active" : ""}`}
                    onClick={() => updateLpConfig("quality", q.value)}>
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="section">
              <label>Interacción</label>
              <button
                className={`toggle-btn ${lpConfig.interactive !== false ? "active" : ""}`}
                onClick={() =>
                  updateLpConfig(
                    "interactive",
                    !(lpConfig.interactive !== false),
                  )
                }
                style={{ width: "100%", textAlign: "center" }}>
                {lpConfig.interactive !== false
                  ? "Activada (Ratón)"
                  : "Desactivada"}
              </button>
            </div>
          </>
        )}

        {/* --- CONTENIDO PARA BALLPIT --- */}
        {activeBackground === "ballpit" && (
          <>
            <div className="section">
              <label>Colores</label>
              <div className="color-pickers">
                {bpConfig.colors.map((color, idx) => (
                  <div key={idx} className="color-input-wrapper">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateBpColor(idx, e.target.value)}
                    />
                    <span className="hex-code">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <label>
                Cantidad <span>{bpConfig.count}</span>
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={bpConfig.count}
                onChange={(e) =>
                  updateBpConfig("count", parseInt(e.target.value))
                }
              />

              <label>
                Gravedad <span>{bpConfig.gravity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={bpConfig.gravity}
                onChange={(e) =>
                  updateBpConfig("gravity", parseFloat(e.target.value))
                }
              />

              <label>
                Fricción <span>{bpConfig.friction}</span>
              </label>
              <input
                type="range"
                min="0.8"
                max="1"
                step="0.001"
                value={bpConfig.friction}
                onChange={(e) =>
                  updateBpConfig("friction", parseFloat(e.target.value))
                }
              />

              <label>
                Rebote Pared <span>{bpConfig.wallBounce}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={bpConfig.wallBounce}
                onChange={(e) =>
                  updateBpConfig("wallBounce", parseFloat(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>Interacción</label>
              <button
                className={`toggle-btn ${bpConfig.followCursor ? "active" : ""}`}
                onClick={() =>
                  updateBpConfig("followCursor", !bpConfig.followCursor)
                }
                style={{ width: "100%", textAlign: "center" }}>
                {bpConfig.followCursor ? "Seguir Cursor" : "Cursor Libre"}
              </button>
            </div>
          </>
        )}

        {/* --- CONTENIDO PARA SILK --- */}
        {activeBackground === "silk" && (
          <>
            <div className="section">
              <label>Color</label>
              <div className="color-pickers">
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={sConfig.color}
                    onChange={(e) => updateSilkConfig("color", e.target.value)}
                  />
                  <span className="hex-code">{sConfig.color}</span>
                </div>
              </div>
            </div>

            <div className="section">
              <label>
                Velocidad <span>{sConfig.speed}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={sConfig.speed}
                onChange={(e) =>
                  updateSilkConfig("speed", parseFloat(e.target.value))
                }
              />

              <label>
                Escala <span>{sConfig.scale}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={sConfig.scale}
                onChange={(e) =>
                  updateSilkConfig("scale", parseFloat(e.target.value))
                }
              />

              <label>
                Ruido <span>{sConfig.noiseIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={sConfig.noiseIntensity}
                onChange={(e) =>
                  updateSilkConfig("noiseIntensity", parseFloat(e.target.value))
                }
              />

              <label>
                Rotación <span>{sConfig.rotation}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={sConfig.rotation}
                onChange={(e) =>
                  updateSilkConfig("rotation", parseInt(e.target.value))
                }
              />
            </div>
          </>
        )}

        {/* --- CONTENIDO PARA GALAXY --- */}
        {activeBackground === "galaxy" && (
          <>
            <div className="section">
              <label>
                Densidad <span>{gConfig.density}</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={gConfig.density}
                onChange={(e) =>
                  updateGalaxyConfig("density", parseFloat(e.target.value))
                }
              />

              <label>
                Intensidad Brillo <span>{gConfig.glowIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={gConfig.glowIntensity}
                onChange={(e) =>
                  updateGalaxyConfig(
                    "glowIntensity",
                    parseFloat(e.target.value),
                  )
                }
              />

              <label>
                Saturación <span>{gConfig.saturation}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={gConfig.saturation}
                onChange={(e) =>
                  updateGalaxyConfig("saturation", parseFloat(e.target.value))
                }
              />

              <label>
                Cambio de Tono (Hue) <span>{gConfig.hueShift}</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={gConfig.hueShift}
                onChange={(e) =>
                  updateGalaxyConfig("hueShift", parseFloat(e.target.value))
                }
              />
            </div>

            <div className="section">
              <label>
                Velocidad Rotación <span>{gConfig.rotationSpeed}</span>
              </label>
              <input
                type="range"
                min="-0.5"
                max="0.5"
                step="0.01"
                value={gConfig.rotationSpeed}
                onChange={(e) =>
                  updateGalaxyConfig(
                    "rotationSpeed",
                    parseFloat(e.target.value),
                  )
                }
              />

              <label>
                Velocidad Estrellas <span>{gConfig.starSpeed}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={gConfig.starSpeed}
                onChange={(e) =>
                  updateGalaxyConfig("starSpeed", parseFloat(e.target.value))
                }
              />

              <label>
                Velocidad Animación <span>{gConfig.speed}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={gConfig.speed}
                onChange={(e) =>
                  updateGalaxyConfig("speed", parseFloat(e.target.value))
                }
              />
            </div>
          </>
        )}

        {/* --- CONTENIDO PARA GRADIENT --- */}
        {activeBackground === "gradient" && (
          <>
            <div className="section">
              <label>Colores</label>
              <div className="color-pickers">
                <div className="color-input-wrapper">
                  <label style={{ fontSize: "0.8rem", marginBottom: 5 }}>
                    Superior
                  </label>
                  <input
                    type="color"
                    value={gradConfig.color1}
                    onChange={(e) =>
                      updateGradientConfig("color1", e.target.value)
                    }
                  />
                </div>
                <div className="color-input-wrapper">
                  <label style={{ fontSize: "0.8rem", marginBottom: 5 }}>
                    Inferior
                  </label>
                  <input
                    type="color"
                    value={gradConfig.color2}
                    onChange={(e) =>
                      updateGradientConfig("color2", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <label>
                Velocidad (segundos) <span>{gradConfig.speed}s</span>
              </label>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={gradConfig.speed}
                onChange={(e) =>
                  updateGradientConfig("speed", parseInt(e.target.value))
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BackgroundCustomizer;
