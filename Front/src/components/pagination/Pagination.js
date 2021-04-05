/*Componente encargado de la paginacion de la lista de productos */

import React from "react";
import "./Pagination.css";
export const Pagination = ({
  page,
  setPage,
  itemsPerPage,
  itemsCount,
  pagesToSee = 8,
}) => {
  const pagesAmount = Math.ceil(itemsCount / itemsPerPage);
  const halfPagesToSee = pagesToSee / 2;

  const activePage = (p) => (page === p ? "active-page" : "");

  const iniIdx =
    pagesAmount > pagesToSee && page > halfPagesToSee
      ? page > pagesAmount - halfPagesToSee
        ? pagesAmount - pagesToSee
        : page - halfPagesToSee
      : 0;

  const finIdx = page > halfPagesToSee ? page + halfPagesToSee : pagesToSee;

  const pages = Array(pagesAmount)
    .fill()
    .map((_, i) => i + 1)
    .slice(iniIdx, finIdx)
    .map((p) => (
      <li key={p}>
        <div className={`${activePage(p)}`} onClick={() => setPage(p)}>
          {p}
        </div>
      </li>
    ));
  return (
    <div className="pagination">
      <ul>
        <li>
          <div onClick={() => setPage(1)}>&laquo;</div>
        </li>

        {pages}
        <li>
          <div onClick={() => setPage(pagesAmount)}>&raquo;</div>
        </li>
      </ul>
    </div>
  );
};
