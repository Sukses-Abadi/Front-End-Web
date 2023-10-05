"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import fetchData from "@/lib/fetch";
import CreateAddress from "@/components/profile/CreateAddress";
import UpdateAddress from "@/components/profile/UpdateAddress";

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

        if (!getCookie("accessToken")) {
          logout();
          toast.info("Your session has expired");
          router.push("/");
        } else if (result.status === "success") {
          const user = result.data;
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

  const [listAddress, setListAddress] = useState([]);

  useEffect(() => {
    if (user) {
      const address = user.address;
      setListAddress(address);
    }
  }, [user]);

  return (
    <div className="flex flex-col h-full p-3">
      <div className="container p-3">
        <h1 className="font-medium text-xl text-primary opacity-60">Address</h1>
      </div>

      {/* Start Modal */}
      <div className="w-full px-3">
        <CreateAddress cities={cities} />
      </div>
      {/* End Modal */}

      {/* Start List Address */}
      {listAddress.map((address) => {
        return (
          <UpdateAddress key={address.id} address={address} cities={cities} />
        );
      })}
      {/* End List Address */}
    </div>
  );
}
