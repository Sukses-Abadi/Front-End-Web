import fetchData from "@/lib/fetch";
import slugify from "@/lib/slugify";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "./assets/logo.svg";
import ClientNavbar from "./ClientNavbar";
import { cookies } from "next/headers";
import fetchWithToken from "@/lib/fetchWithToken";
import SearchComponent from "./Search";
export default async function Navbar() {
  const { data } = await fetchData("api/category", "GET", {
    cache: "no-store",
  });
  // Get the category to render
  const category = data;
  let userData = null;
  //Check Token
  let isLoggedIn = false;
  const accessToken = cookies().get("accessToken");
  if (accessToken) {
    const token = accessToken.value;

    // Get User Data
    const res = await fetchWithToken("api/user", token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Adjust content type if needed
      },
      cache: "no-store",
    });

    userData = res?.data;
    if (userData) {
      isLoggedIn = true;
    }
  }
  return (
    <nav className="flex bg-white w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl hidden md:flex"
        >
          <Image
            alt="Coolest Brand ver!"
            src={logo}
            width="auto"
            height="auto"
          />
        </Link>

        {/* Start Menu Web View */}

        <ul className="menu menu-horizontal text-primary font-semibold max-lg:hidden">
          {category.map((category, index) => {
            return (
              <li className="dropdown dropdown-hover" key={category.id}>
                <Link href={`/category/${category.id}`}>
                  <p tabIndex={0} className="">
                    {category.name}
                  </p>
                </Link>
                <ul className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                  {/* mapping from category.subcategory  */}
                  {category.SubCategory.map((subcategory, index) => {
                    const slug = slugify(subcategory.name);
                    return (
                      <li className="w-60" key={subcategory.id}>
                        <Link href={`/sub/${subcategory.id}`}>
                          {subcategory.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* End Menu Web View  */}

        {/* search Bar */}
        <SearchComponent />
        {/* Client Component Or Login */}
        {isLoggedIn ? (
          <ClientNavbar />
        ) : (
          <Link className=" btn btn-primary" href="/auth/login">
            Log In
          </Link>
        )}
      </div>

      {/* Start Toggle Navbar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
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

      <div className="dropdown dropdown-left flex items-stretch lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle align-middle ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 align-middle"
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
          className="menu menu-md bg-base-100 rounded-lg max-w-lg dropdown-content  mt-3  z-[10] p-2 w-60"
        >
          {!isLoggedIn ? (
            <li>
              <ul className="flex items-center">
                <Link
                  className="my-4 bg-primary text-gray-100 px-4 py-2 rounded-lg"
                  href="/auth/login"
                >
                  Log in
                </Link>
              </ul>
            </li>
          ) : null}
          {category.map((category, index) => {
            return (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}>{category.name}</Link>
                <ul>
                  {category.SubCategory.map((subcategory, index) => {
                    return (
                      <li key={subcategory.id}>
                        <Link href={`/sub/${subcategory.id}`}>
                          {subcategory.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {/* End Toggle Navbar */}
    </nav>
  );
}
