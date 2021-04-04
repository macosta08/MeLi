import React from "react";
import queryString from "query-string";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { useForm } from "../../hook/useForm";
import "./SearchBox.css";

export const SearchBox = () => {
  const location = useLocation();
  const history = useHistory();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({ searchText: q });
  const { searchText } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    history.push("/");
    history.push(`items?search=${searchText[0]}`);
  };

  return (
    <nav>
      <div className="logo"></div>
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Nunca dejes de buscar"
          name="searchText"
          value={searchText}
          onChange={handleInputChange}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </nav>
  );
};
