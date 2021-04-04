import React from "react";
import { formatCurrency } from "../../utils/formatter";
import "./ContainerDetail.css";
export const ContainerDetail = ({ product }) => {
  const {
    picture,
    title,
    price: { amount, decimals, currency },
    condition,
    sold_quantity,
    description,
  } = product;

  return (
    <div id="main">
      <div className="article">
        <div className="info">
          <img className="picture" src={picture} alt={title} />
        </div>
        <div className="description">
          <h3 className="title-description">Descripción del producto</h3>
          <p className="text-description">{description}</p>
        </div>
      </div>
      <div className="aside">
        <div className="condition">
          <span>{condition === "new" ? "Nuevo -" : "Usado -"}</span>
          <span> {sold_quantity} vendidos</span>
        </div>
        <h2>{title}</h2>
        <div className="price">
          <span>{formatCurrency(amount, currency)}</span>
          <span className="decimals">{decimals.toString().padEnd(2, "0")}</span>
        </div>
        <div className="btn-comprar-container">
          <button className="btn-comprar">Comprar</button>
        </div>
      </div>
    </div>
  );
};
