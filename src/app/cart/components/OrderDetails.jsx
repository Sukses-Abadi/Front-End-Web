"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderDetails() {
  const { token, isLoggedIn, logout, refresh, setRefresh } = useAuthStore();
  const router = useRouter();
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(null);
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchWithToken(
          "api/cart",
          getCookie("accessToken"),
          {
            cache: "no-store",
          }
        );
        if (!getCookie("accessToken")) {
          logout();
          toast.info("Your session has expired");
          router.push("/");
        } else if (data.status === "success") {
          const cart = data.data;
          setCart(cart);
          const items = cart.CartProduct;
          setCartProduct(items);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error (e.g., show a toast message)
        toast.error("An error occurred. Please try again later.");
      }
    };
    if (isLoggedIn) {
      getData();
    }
  }, [token, router, isLoggedIn, logout, refresh]);
  if (!cart) return;

  const handleAddAddress = () => {};
  console.log(user);
  return (
    <div id="summary" className="lg:w-1/4 px-8 py-10  ">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Total Price</span>
        <span className="font-semibold text-sm">Rp. {cart.total_price}</span>
      </div>
      <div className="my-3">
        <label className="font-medium  inline-block mb-3 text-sm uppercase">
          Address
        </label>
        <select
          className="block p-2 text-gray-600 w-full text-sm"
          placeholder="Select Address"
        >
          <option onClick={handleAddAddress}> Add Address</option>
          {user.address.map((address) => {
            <option>
              <span>{address.name}</span>
              <br />
              {address.street}, {address.City.name}, {address.zip_code}{" "}
            </option>;
          })}
        </select>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          Shipping
        </label>
        <select className="block p-2 text-gray-600 w-full text-sm">
          <option>Standard shipping - $10.00</option>
        </select>
      </div>
      <div className="py-10">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          placeholder="Enter your code"
          className="p-2 text-sm w-full"
        />
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
        Apply
      </button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>$600</span>
        </div>
        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </button>
      </div>
    </div>
  );
}
