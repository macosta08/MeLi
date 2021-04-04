/* Componente encargado de  armar la tarjeta por producto 
 Se llama a la funcion formatCurrency para formatear el precio
*/

import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { formatCurrency } from "../../utils/formatter";
export const Product = ({ product }) => {
  const {
    id,
    title,
    price: { amount: price, currency },
    picture,
    location,
    free_shipping,
  } = product;

  return (
    <Link to={`/items/${id}`} className="link">
      <div key={id} className="product-container">
        <div className="product-image">
          <img src={picture} alt={title} />
        </div>
        <div className="product">
          <div className="product-price">
            {formatCurrency(price, currency)}
            {free_shipping && (
              <img src="img/ic_shipping.png" alt="Envío gratis" />
            )}
          </div>
          <div className="product-title">{title}</div>
        </div>
        <div className="location">
          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
};
