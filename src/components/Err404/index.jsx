import React, { useState } from "react";
import "./style.css";

const Err404 = () => {
  useState(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 4500);
  }, []);

  return (
    <div className="sm-container">
      <section className="error-container">
        <span>
          <span id="firstNumber">4</span>
        </span>
        <span id="secondNumber">0</span>
        <span>
          <span id="thirdNumber">4</span>
        </span>
      </section>
      <div className="messageContainer">
        <p className="messageError">¡OPS! Algo salió mal.</p>
        <p className="messageError">Pagina no encontrada</p>
        <p className="messageError">
          Se redirigira al <b>inicio</b>.
        </p>
      </div>
    </div>
  );
};

export default Err404;
