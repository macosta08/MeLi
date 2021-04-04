/* Componente principal encargado de mostrar la caja de busqueda y arbol
de rutas

Nota: se usa HashRouter para evitar futuros errores en el despliegue 
en netlify
*/

import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ProductDetail } from "../components/productDetail/ProductDetail";
import { SearchBox } from "../components/searchBox/SearchBox";
import { SearchResult } from "../components/searchResult/SearchResult";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <SearchBox />
        <Switch>
          <Route exact path="/items/:id" component={ProductDetail} />
          <Route path="/" component={SearchResult} />
        </Switch>
      </div>
    </Router>
  );
};
