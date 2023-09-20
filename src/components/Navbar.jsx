import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "./assets/logo.svg";

export default function Navbar() {
  const top = [
    "T-shirt Long Sleeve",
    "T-shirt Short Sleeve",
    "Sweater",
    "Shirt Long Sleeve",
    "Shirt Short Sleeve",
  ];
  const bottom = ["Jeans", "Sweatpants", "Shorts"];
  const outerwear = ["Jacket", "Hoodie"];
  return (
    <div className="bg-white w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <Image src={logo} width={200} height={30} />
        </a>

        {/* Start Menu Web View */}

        <ul className="menu menu-horizontal text-primary font-semibold max-lg:hidden">
          <li tabIndex={0}>
            <details>
              <summary>Top</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {top.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Bottom</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {bottom.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Outerwear</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {outerwear.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        </ul>

        {/* End Menu Web View  */}

        <div className="relative flex items-center justify-between max-auto max-lg:hidden">
          {/* Start Search Button */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm rounded-md border border-primary"
            placeholder="Search..."
          />
          {/* End Search Button */}

          {/* Start Button Cart */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http:.w3.org/2000/svg"
                  className="h-7 w-7 stroke-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <Link href="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End Button Cart */}

          {/* Start Button Profile */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/user" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* End Button Profile */}
      </div>

      {/* Start Toggle Navbar */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        {/* ----------------- */}
        <ul
          tabIndex={0}
          className="menu menu-md bg-base-100 rounded-lg max-w-lg dropdown-content -translate-x-72 mt-3 z-[1] p-2 w-80"
        >
          <li tabIndex={0}>
            <details>
              <summary>Top</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {top.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Bottom</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {bottom.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Outerwear</summary>
              <ul className="p-2 text-black">
                {/* mapping from category -1  */}
                {outerwear.map((subcategory, index) => {
                  return (
                    <li key={index + 1}>
                      <a>{subcategory}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      {/* End Toggle Navbar */}
    </div>
  );
}
