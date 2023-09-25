"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import fetchData from "@/lib/fetch";

export default function Address() {
  const { token, isLoggedIn, logout, refresh, setRefresh } = useAuthStore();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      const result = await fetchData("api/city");
      const cityArray = result.data;
      setCities(cityArray);
    };

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
          router.push("/");
        } else if (result.status === "success") {
          const user = result.data;
          // console.log(user);
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
    fetchCity();
    if (isLoggedIn) {
      getData();
    }
  }, [token, router, isLoggedIn, logout]);
  return (
    <div className="flex flex-col h-full p-3">
      <div className="container p-3">
        <h1 className="font-medium text-xl text-primary opacity-60">Address</h1>
      </div>

      {/* Start Modal */}
      <div className="w-full px-3">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="w-full border-dotted border-2 border-primary px-3 py-4 text-sm font-semibold text-center text-primary rounded-sm hover:bg-primary hover:text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Your Address
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box rounded-lg">
            <form method="dialog">
              <div className="flex flex-row pb-8">
                <h1 className="font-medium text-lg text-primary opacity-80">
                  Add Your Address
                </h1>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-2">
                  ✕
                </button>
              </div>
            </form>
            <form className="space-y-6" action="#">
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="Home / Work"
                />
              </div>
              <div>
                <label
                  className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Street
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="444 Birch Rd"
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    City
                  </label>
                  <div className="relative">
                    <select
                      className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-city"
                      name="city_id"
                    >
                      {cities.map((city) => {
                        return (
                          <option
                            key={city.id}
                            value={city.id}
                            className="h-24"
                          >
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
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Zip Code
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="12345"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {/* End Modal */}

      {/* Start List Address */}
      {user &&
        user.address &&
        user.address.map((address) => {
          return (
            <div
              key={address.id}
              className="flex flex-col mt-4 p-4 w-full border rounded-md shadow-md"
            >
              <div className="flex">
                <h1 className="text-lg font-semibold text-primary pb-3">
                  {address.name}
                </h1>
              </div>
              <div className="flex">
                <p className="text-md font-light text-primary">
                  Street : {address.street}
                </p>
              </div>
              <div className="flex">
                <p className="text-md font-light text-primary">
                  City : {address.city.name}
                </p>
              </div>
              <div className="flex">
                <p className="text-md font-light text-primary">
                  Zip Code : {address.zip_code}
                </p>
              </div>

              <div className="flex flex-row-reverse gap-y-2">
                <button className="text-sm font-normal text-red-600 px-3 py-4  hover:text-red-800">
                  Delete Address
                </button>

                <button
                  className="text-sm font-normal text-red-600 px-3 py-4  hover:text-red-800"
                  onClick={() =>
                    document
                      .getElementById(`my_modal_${address.id}`)
                      .showModal()
                  }
                >
                  Edit Address
                </button>

                <dialog id={`my_modal_${address.id}`} className="modal">
                  <div className="modal-box rounded-lg">
                    <form method="dialog">
                      <div className="flex flex-row pb-8">
                        <h1 className="font-medium text-lg text-primary opacity-80">
                          Edit Your Address
                        </h1>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute text-lg right-2">
                          ✕
                        </button>
                      </div>
                    </form>
                    <form className="space-y-6" action="#">
                      <div>
                        <label
                          className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                          htmlFor="grid-username"
                        >
                          Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-username"
                          type="text"
                          placeholder={address.name}
                        />
                      </div>
                      <div>
                        <label
                          className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                          htmlFor="grid-username"
                        >
                          Street
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-username"
                          type="text"
                          placeholder={address.street}
                        />
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            City
                          </label>
                          <div className="relative">
                            <select
                              className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              id="grid-city"
                              name="city_id"
                            >
                              {cities.map((city) => {
                                return (
                                  <option
                                    key={city.id}
                                    value={city.id}
                                    className="h-24"
                                    selected={address.city.id === city.id}
                                  >
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
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Zip Code
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder={address.zip_code}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="w-full border border-primary px-3 py-3 text-sm font-medium text-center text-primary rounded-lg hover:bg-primary hover:text-white"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
          );
        })}
      {/* End List Address */}
    </div>
  );
}
