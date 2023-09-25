"use client";
import fetchData from "@/fetch";
import React from "react";
import { toast } from "react-toastify";

export default function page() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const email = e.target.email;
    const body = {
      email: email.value,
    };
    console.log(`clicked`);
    try {
      const response = await fetchData(
        "api/forget-password",
        "POST",
        null,
        body
      );
      toast(response.message);
      return response;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed (e.g., show a user-friendly message)
      throw new Error("Error resetting password");
    }
  };

  return (
    <div className="w-screen h-96 justify-center items-center flex">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please enter your email address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email address"
            />
          </div>
          {/* <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div> */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {" "}
              Submit
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy; Sukses Abadi. All rights reserved.
        </p>
      </div>
    </div>
  );
}
