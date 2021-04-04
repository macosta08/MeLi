/*Componente que se muestra si no encuentra un producto*/

import React from "react";
import "./NotFound.css";
export const NotFound = () => {
  return (
    <main>
      <div className="product-container-notFound">
        <i className="fas fa-search-minus search-icon-notFound"></i>
        <div className="text-container-notFound">
          <p> No hay publicaciones que coincidan con tu búsqueda.</p>

          <ul>
            <li>Revisa la ortografía de la palabra.</li>
            <li>Utiliza palabras más genéricas o menos palabras.</li>
          </ul>
        </div>
      </div>
    </main>
  );
};
