/* Componente encargado rederizar dinamicamente cada tarjeta*/

import React from "react";
import { Product } from "../product/Product";

export const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};
