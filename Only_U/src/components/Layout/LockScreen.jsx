import React, { useState } from "react";
import { useGameStore } from "../../store/useStore";
import ShinyText from "../UI/ShinyText";
import Silk from "../Backgrounds/Silk";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa"; // <--- NUEVOS ICONOS
import "../../styles/LockScreen.scss";

const LockScreen = () => {
  const [inputDate, setInputDate] = useState("");
  const [error, setError] = useState(false);

  // ESTADO PARA ALTERNAR VISIBILIDAD
  const [showPassword, setShowPassword] = useState(false);

  const unlockApp = useGameStore((state) => state.unlockApp);
  const SECRET_CODE_RAW = "230824";

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length > 6) return;

    let formattedValue = rawValue;
    if (rawValue.length > 2)
      formattedValue = rawValue.slice(0, 2) + "/" + rawValue.slice(2);
    if (rawValue.length > 4)
      formattedValue = formattedValue.slice(0, 5) + "/" + rawValue.slice(4);

    setInputDate(formattedValue);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = inputDate.replace(/\//g, "");

    if (cleanInput === SECRET_CODE_RAW) {
      unlockApp();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="lock-screen">
      <Silk
        speed={4}
        scale={1}
        color="#9726fa"
        noiseIntensity={1.5}
        rotation={0}
      />

      <div className="lock-content">
        <h1>
          <ShinyText text="La fecha donde empezó todo" />
        </h1>

        <form onSubmit={handleSubmit}>
          {/* ENVOLTORIO PARA INPUT + OJO */}
          <div className="input-wrapper">
            <input
              /* AQUÍ CAMBIAMOS EL TIPO DINÁMICAMENTE */
              type={showPassword ? "text" : "password"}
              inputMode="numeric"
              placeholder="DD/MM/AA"
              value={inputDate}
              onChange={handleChange}
              className={error ? "error" : ""}
            />

            {/* BOTÓN DEL OJO */}
            <button
              type="button" // Importante: type="button" para que no envíe el form
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* BOTÓN DE ENTRAR (con clase específica ahora) */}
          <button type="submit" className="submit-btn">
            <FaArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockScreen;
