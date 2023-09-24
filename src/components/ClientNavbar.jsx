"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";

import { deleteCookie, getCookie, getCookies } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function ClientNavbar(props) {
  const router = useRouter();
  const { refresh, setRefresh, token, setToken, isLoggedIn, login, logout } =
    useAuthStore();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchCart = async (token) => {
      const data = await fetchWithToken("api/user", token);
      return await data;
    };

    const fetchData = async () => {
      const storedToken = getCookie("accessToken");
      if (storedToken) {
        const data = await fetchCart(storedToken);
        setUser(data.data);
        setToken(storedToken);
        login();
        router.refresh();
      }
    };

    fetchData(); // Call the async function immediately
  }, [token, setToken, isLoggedIn, login, router, logout, refresh, setUser]);
  if (!user) return;

  const userData = user;
  const userPhoto = userData.photo;
  const userCart = userData.cart;
  const total_price = userData.cart.total_price;
  const cartItemCount = userCart.CartProduct.length;
  const handleLogOut = () => {
    deleteCookie("accessToken");
    setToken("");
    setRefresh();
    logout();
    router.refresh();
  };
  return (
    <div className="relative flex items-center justify-between max-auto">
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
            <span className="badge badge-sm indicator-item">
              {cartItemCount === 0 ? null : cartItemCount}
            </span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 z-[10] card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="font-bold text-lg">{cartItemCount} Items</span>
            <span className="text-info">Subtotal: Rp. {total_price}</span>
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
            <Image
              alt=""
              src={
                !userPhoto
                  ? "https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  : userPhoto
              }
              width={10}
              height={10}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/user" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href="/order" className="justify-between">
              Payment/Order
            </Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
