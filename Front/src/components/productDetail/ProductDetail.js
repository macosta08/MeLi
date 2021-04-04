/* Componente encargado de hacer el llamado al servidor 
cada vez que cambie la URL y rederizar el Breadcrumb y el 
contenerdor del detalle del producto */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { request, URL } from "../../utils/httpMethod";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import { ContainerDetail } from "../containerDetail/ContainerDetail";
import { Spinner } from "../spinner/Spinner";
import "./ProductDetail.css";
export const ProductDetail = () => {
  let { id } = useParams();
  const endpoint = `${URL}/api/items/${id}`;

  const [product, setProduct] = useState(null);

  const getProduct = async (endpoint) => {
    const response = await request(endpoint);
    setProduct(response.data);
  };

  useEffect(() => {
    getProduct(endpoint);
  }, [endpoint]);

  return (
    <>
      {!product && <Spinner />}
      {product && (
        <main>
          <Breadcrumb categories={product.categories} />
          <ContainerDetail product={product.item} />
        </main>
      )}
    </>
  );
};
