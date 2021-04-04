import React from "react";
import "./Breadcrumb.css";
export const Breadcrumb = ({ categories }) => {
  return (
    <div className="breadcrumb">
      {categories.slice(0, -1).map((category) => (
        <span key={category}>
          {category}
          <i className="fas fa-chevron-right icon-rigth" />
        </span>
      ))}
      <span key={categories.slice(-1)}>
        <b>{categories.slice(-1)}</b>
      </span>
    </div>
  );
};
