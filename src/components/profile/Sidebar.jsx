"use client";
import Link from "next/link";

import profile from "../../components/assets/profile.jpg";
import Image from "next/image";
import { baseUrl } from "@/lib/constant";

import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie, deleteCookie } from "cookies-next";
import fetchWithToken from "@/lib/fetchWithToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export default function Sidebar({ children }) {
  const router = useRouter();

  const { refresh, setRefresh, token, setToken, isLoggedIn, login, logout } =
    useAuthStore();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchWithToken(
          "api/user",
          getCookie("accessToken"),
          {
            cache: "no-store",
          }
        );

        console.log("test");
        if (!getCookie("accessToken")) {
          logout();
          toast.info("Your session has expired");
        } else if (result.status === "success") {
          const user = result.data;
          console.log(user);
          setUser(user);
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
  }, [token, setToken, router, isLoggedIn, logout, refresh]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (user) {
      setUserName(user.username);
      setEmail(user.email);
      setPhoto(user.photo);
    }
  }, [user, router, setRefresh, refresh]);

  const handleLogOut = () => {
    deleteCookie("accessToken");
    setToken("");
    setRefresh();
    logout();
    router.refresh();
  };

  const menuItems = [
    {
      href: "/profile",
      title: "Profile",
    },
    {
      href: "/profile/address",
      title: "Address",
    },
  ];

  return (
    <aside className="basis-1/4 w-full h-full border-2 rounded-l-lg shadow-md">
      <div className="m-5 flex flex-nowrap items-center gap-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <Image
              src={!photo ? profile : `${baseUrl}/${photo}`}
              alt="profile"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="details">
          <h1 className="text-primary font-semibold text-xl">
            {!userName ? "User Profile" : `${userName}`}
          </h1>
          <p className="text-primary font-normal text-sm opacity-70">
            {!email ? "user@email.com " : `${email}`}
          </p>
        </div>
      </div>
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li className="my-2 mx-6" key={title}>
              <Link
                href={href}
                className={`flex p-2 text-primary hover:font-semibold hover:underline hover:underline-offset-8 cursor-pointer`}
              >
                {title}
              </Link>
            </li>
          ))}
          <li className="mx-6 my-2">
            <button
              className={`flex p-2 text-primary hover:font-semibold hover:underline hover:underline-offset-8 cursor-pointer`}
              onClick={handleLogOut}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
