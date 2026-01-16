import React from "react";
import ShinyText from "../UI/ShinyText"; // Reutilizamos tu texto brillante
import "../../styles/MainContent.scss";

const MainContent = () => {
  return (
    <div className="main-container">
      {/* TARJETA DE CRISTAL (Glass Card) */}
      <div className="glass-card">
        {/* CABECERA */}
        <header>
          {/* Puedes usar ShinyText o un h1 normal con la fuente elegante */}
          <h1>Bienvenida, mi vida</h1>
          <div className="subtitle">Hay algo que quiero contarte...</div>
        </header>

        {/* CUERPO DEL TEXTO */}
        <div className="content-body">
          <p>
            Aquí es donde irán tus palabras. Este contenedor tiene un efecto de
            cristal desenfocado que hace que cualquier fondo que pongamos detrás
            se vea increíblemente estético.
          </p>
          <p>
            Podemos poner fotos, poemas o simplemente un "Te Quiero" gigante.
            Todo lo que pongas aquí flotará sobre el universo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
