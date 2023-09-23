"use client";

import fetchData from "@/lib/fetch";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddressForm() {
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { refresh, setRefresh } = useAuthStore();
  useEffect(() => {
    const fetchCity = async () => {
      const res = await fetchData("api/city");
      const cityArray = res.data;
      setCities(cityArray);
    };
    fetchCity();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const street = e.target.street.value;
    const city_id = e.target.city_id.value;
    const zip_code = e.target.zip_code.value;
    const body = { name, street, city_id, zip_code };

    try {
      const response = await fetchWithToken(
        "api/address",
        getCookie(`accessToken`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.data) {
        console.log("Address added successfully");
        toast.success("Address added");
        setRefresh();
        router.refresh();
      } else {
        console.error("Error adding address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="address-name"
              type="text"
              placeholder="Home / Work"
              name="name"
              required
            />
            {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="street-address"
            >
              Street Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="street-address"
              type="text"
              placeholder="Jln. Merdeka No 5"
              name="street"
              required
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you do like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              City
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="city_id"
              >
                {cities.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
              name="zip_code"
            />
          </div>
        </div>
        <button
          type="submit"
          className="group relative h-10 w-44 overflow-hidden rounded-lg bg-white text-lg shadow p-2"
        >
          <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-sm text-black group-hover:text-white">
            Add Address
          </span>
        </button>
      </form>
    </div>
  );
}
