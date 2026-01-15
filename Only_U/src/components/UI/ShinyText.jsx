import React from "react";
import "../../styles/ShinyText.scss"; // Ahora crearemos este estilo

const ShinyText = ({ text, disabled = false, speed = 3, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}>
      {text}
    </div>
  );
};

export default ShinyText;
