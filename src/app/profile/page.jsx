"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import Image from "next/image";
import profile from "../../components/assets/profile.jpg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { baseUrl } from "@/lib/constant";

export default function Profile(props) {
  const router = useRouter();
  const { token, setToken, isLoggedIn, logout, refresh, setRefresh } =
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setUserName(user.username);
      setEmail(user.email);
      setPhoto(user.photo);
    }
  }, [user, router, setRefresh, refresh]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("files", photo);

    try {
      const image = await fetchWithToken(
        "api/uploads",
        getCookie(`accessToken`),
        {
          method: "POST",
          body: formData,
        }
      );

      // console.log(image[0].photo);

      let payload = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        photo: image[0].photo,
      };

      // console.log(payload);

      const data = await fetchWithToken("api/user", getCookie(`accessToken`), {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(`${data.message}`);
      setRefresh();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full p-3">
      <div className="container p-3">
        <h1 className="font-medium text-xl text-primary opacity-60">Profile</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {/* Start Upload Image*/}

        <div className="max-w-sm bg-white border rounded-lg shadow">
          <div className="flex pt-3 pb-2 px-2 place-content-center">
            <div className="avatar ">
              <div className="w-64 mask mask-squircle items-center">
                <Image
                  className="object-fill object-center"
                  src={!photo ? profile : `${baseUrl}/${photo}`}
                  alt="photo"
                  width="800"
                  height="800"
                />
              </div>
            </div>
          </div>
          <div className="px-8 pb-10">
            <ul className="list-disc text-xs font-medium italic">
              <li>File type (jpg/jpeg)</li>
              <li>max size 10 Mb</li>
            </ul>
          </div>
          <div className="container p-2">
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
              id="large_size"
              type="file"
              name="files"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
        </div>

        {/* End Upload */}

        {/* Start Detail Profile */}
        <div className="col-span-2">
          <div className="p-5">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-username"
                  >
                    Username
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-username"
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <button
                    className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white"
                    onClick={handleSubmit}
                  >
                    Update Details Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End Detail Profile */}
      </div>
    </div>
  );
}
