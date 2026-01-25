import React, { useState } from "react";
import { useGameStore } from "../../store/useStore";
import ShinyText from "../UI/ShinyText";
import Silk from "../Backgrounds/Silk"; // Importamos el fondo
import { FaArrowRight } from "react-icons/fa"; // Importamos el icono
import "../../styles/LockScreen.scss";

const LockScreen = () => {
  const [inputDate, setInputDate] = useState("");
  const [error, setError] = useState(false);
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
      {/* EL FONDO SILK VIVE AQUÍ Y MUERE CUANDO ESTE COMPONENTE SE DESMONTA */}
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
          <input
            type="text"
            inputMode="numeric"
            placeholder="DD/MM/AA"
            value={inputDate}
            onChange={handleChange}
            className={error ? "error" : ""}
          />
          {/* BOTÓN CON ICONO */}
          <button type="submit">
            <FaArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockScreen;
