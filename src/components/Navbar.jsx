import fetchData from "@/lib/fetch";
import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const { data } = await fetchData("api/category", "GET", {
    cache: "no-store",
  });
  const category = data;

  return (
    <div className="navbar z-10 bg-secondary">
      {/* Side Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {category.map((category, index) => {
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                  {category.SubCategory.map((subcategory, index) => {
                    return (
                      <ul key={subcategory.id}>
                        <Link href={`/sub/${subcategory.id}`}>
                          {subcategory.name}
                        </Link>
                      </ul>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl hidden md:flex"
        >
          SA.
        </Link>
      </div>
      {/* Menu Web view */}
      <div className="navbar-center hidden z-10 md:flex">
        <ul className="menu menu-horizontal px-1">
          {category.map((category, index) => {
            return (
              <li key={category.id}>
                <details>
                  <summary>{category.name}</summary>
                  <ul className="p-2">
                    {/* {category.SubCategory.map((subcategory, index) =>
                      console.log(subcategory)
                    )} */}
                    {/* mapping from category.subcategory  */}
                    {category.SubCategory.map((subcategory, index) => {
                      const slug = slugify(subcategory.name);
                      return (
                        <li key={subcategory.id}>
                          <Link href={`/sub/${subcategory.id}`}>
                            {subcategory.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
      {/* searchbar */}
      <div className="form-control ">
        <div className=" input-group input-group-md">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full w-min-200 max-w-xs input-md  "
          />
          <button className="btn btn-square bg-secondary border-gray-900 btn-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Cart */}
      <div className="flex-none ">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http:.w3.org/2000/svg"
                className="h-6 w-6"
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
        {/* Profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt=""
                src="https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                width={50}
                height={50}
              />
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
    </div>
  );
}
