/* Componente encargado de hacer el llamado al servidor 
cada vez que cambie la URL. Rederiza el Breadcrumb, 
la lista de productos y la paginación */

import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";

import { request, URL } from "../../utils/httpMethod";
import { Products } from "../products/Products";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import { Spinner } from "../spinner/Spinner";
import { NotFound } from "../notFound/NotFound";
import { Pagination } from "../pagination/Pagination";
import "./SearchResult.css";
export const SearchResult = () => {
  const location = useLocation();
  const search = queryString.parse(location.search);
  const searchProduct = search.search;

  const endpoint = `${URL}/api/items?q=${searchProduct}`;
  const [data, setdata] = useState(null);

  const [page, setPage] = useState(1);
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
      {!data && <Spinner />}

      {data && (
        <>
          <main>
            <Breadcrumb categories={data.categories} />
            <Products products={data.items.slice(idxIni, idxFin)} />
          </main>
          <Pagination
            page={page}
            setPage={setPage}
            itemsPerPage={amount}
            itemsCount={data.items.length}
          />
        </>
      )}
      {data && data.items.length === 0 && <NotFound />}
    </>
  );
};
