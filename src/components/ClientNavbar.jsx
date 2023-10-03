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
        // router.refresh();
      }
    };

    fetchData(); // Call the async function immediately
  }, [token, setToken, isLoggedIn, login, logout, refresh, setUser]);
  useEffect(() => {
    if (user) {
      router.refresh();
    }
  }, [user, router, setRefresh, refresh]);
  if (!user) return;

  const userData = user;
  const userPhoto = userData.photo;
  const userPhotoUrl = `http://localhost:5000/${userPhoto}`;
  const userCart = userData.cart;
  const total_price = userData.cart?.total_price || 0;
  const cartItemCount = userCart?.CartProduct.length;
  const handleLogOut = () => {
    deleteCookie("accessToken");
    setToken("");
    setRefresh();
    logout();
    router.refresh();
  };
  return (
    <div className="relative flex items-center justify-between max-auto">
      {/* End Search Button */}

      {/* Start Button Cart */}
      <div className="dropdown dropdown-bottom  min-[473px]:dropdown-end">
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
      <div className="dropdown dropdown-bottom min-[473px]:dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              alt=""
              src={
                !userPhoto
                  ? "https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  : userPhotoUrl
              }
              width={100}
              height={100}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/profile" className="justify-between">
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
