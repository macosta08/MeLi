import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductDetail } from "../components/productDetail/ProductDetail";
import { SearchBox } from "../components/searchBox/SearchBox";
import { SearchResult } from "../components/searchResult/SearchResult";
///items?search=:product
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
