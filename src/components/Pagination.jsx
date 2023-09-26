"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Pagination = ({ data }) => {
  const { prevPage, currentPage, nextPage, totalPage } = data;
  console.log(
    "prevPage:",
    prevPage,
    "nextPage:",
    nextPage,
    "currentPage:",
    currentPage
  );
  return (
    <div className="join">
      {!prevPage ? null : (
        <Link href={`?page=${prevPage}`} className="join-item btn">
          {prevPage}
        </Link>
      )}
      {!currentPage ? null : (
        <Link href={`?page=${currentPage}`} className="join-item btn">
          {currentPage}
        </Link>
      )}
      {!nextPage ? null : (
        <Link href={`?page=${nextPage}`} className="join-item btn">
          {nextPage}
        </Link>
      )}

      {nextPage + 1 < totalPage - 2 ? (
        <button className="join-item btn btn-disabled">...</button>
      ) : null}
      {totalPage >= nextPage + 1 ? (
        <button className="join-item btn">{totalPage - 1}</button>
      ) : null}
      {totalPage >= nextPage + 2 ? (
        <button className="join-item btn">{totalPage}</button>
      ) : null}
    </div>
  );
};

export default Pagination;
