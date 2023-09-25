"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../components/assets/logo.svg";
import { baseUrl } from "@/lib/constant";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import { useAuthStore } from "@/zustand";

// export const metadata = {
//   title: "Sukses Abadi Login Page",
//   description:
//     "Login Page of Leading Apparel E-commerce Store that sell high quality products",
// };

export default function Page() {
  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`clicked`);
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response?.json();
      if (response.ok) {
        const token = data?.data;
        setCookie("accessToken", token);
        setToken(token);
        login();
        toast.success("Login successful!");
        router.refresh();
        router.push("/");
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className=" py-32">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl bg-[url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')]">
        <div className="hidden lg:block lg:w-1/2 bg-cover "></div>
        <form onSubmit={handleSubmit} className="w-full p-8 lg:w-1/2 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            <Image
              className="m-auto"
              alt="Coolest Brand ver!"
              src={logo}
              width="auto"
              height="auto"
            />
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              login
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              name="username"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Link href="/auth/reset" className="text-xs text-gray-500">
                Forget Password?
              </Link>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="password"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              href="/auth/register"
              className="text-xs text-gray-500 uppercase"
            >
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
}
