"use client";
import fetchData from "@/fetch";
import React from "react";
import { toast } from "react-toastify";

export default function page(req) {
  const token = req.params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;
    if (!(password === confirmPassword)) {
      toast.error(`Passwords do not match`);
    }

    const body = {
      newPassword: confirmPassword,
    };
    try {
      const response = await fetchData(
        `api/forget-password/${token}`,
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
              Please enter your new password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="New password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Please re-enter your new password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="confirm_password"
              type="password"
              placeholder="New password"
            />
          </div>

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
