import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { request, URL } from "../../utils/httpMethod";
import "./SearchResult.css";
import { Products } from "../products/Products";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";

export const SearchResult = () => {
  const location = useLocation();
  const search = queryString.parse(location.search);
  const searchProduct = search.search;
  const endpoint = `${URL}/api/items?q=${searchProduct}`;
  const [data, setdata] = useState(null);
  const [page] = useState(1);
  const [amount] = useState(4);

  //Se calculan los indices para poder aplicar el slice
  //en el arreglo de items
  const idxIni = (page - 1) * amount;
  const idxFin = page * amount;

  const getProduct = async (endpoint) => {
    const response = await request(endpoint);
    setdata(response.data);
  };

  useEffect(() => {
    getProduct(endpoint);
  }, [endpoint]);

  return (
    <>
      {data && (
        <main>
          <Breadcrumb categories={data.categories} />
          <Products products={data.items.slice(idxIni, idxFin)} />
        </main>
      )}
    </>
  );
};
