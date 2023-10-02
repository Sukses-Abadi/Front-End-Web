"use client";
import { baseUrl } from "@/lib/constant";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";

export default function Page() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/");
  }
  function isSlugFriendly(username) {
    const pattern = /^[a-z0-9-]+$/;
    return pattern.test(username) && username.length >= 6;
  }

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsUsernameValid(isSlugFriendly(newUsername));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    if (password !== confirm_password) {
      toast.error("Password do not match");
      return;
    }
    // Check if username is valid
    if (!isUsernameValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          first_name,
          last_name,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error(`${data.message}`);
        return;
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container mx-auto py-14">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <form
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="username"
              placeholder="John-doe"
              value={username}
              onChange={handleUsernameChange}
            />
            {!isUsernameValid ? (
              <span className=" text-[11px] text-red-500 ">
                Username should only contain lowercase letters, numbers, hyphens
                and minimum of 6 character.
              </span>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="first_name"
              placeholder="John"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              name="last_name"
              placeholder="Doe"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="********"
            />
          </div>
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
