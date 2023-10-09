"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore, useUserStore } from "@/zustand";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddressForm from "./AddressForm";
import fetchData from "@/lib/fetch";

export default function OrderDetails() {
  const courierOption = [
    { name: "Jalur Nugraha Ekakurir (JNE)", id: "jne" },
    { name: "TIKI", id: "tiki" },
    { name: "POS Indonesia", id: "pos" },
  ];
  const { token, isLoggedIn, logout, refresh, setRefresh } = useAuthStore();
  const router = useRouter();
  const [bankArray, setBankArray] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [cart, setCart] = useState(null);
  const { user, setUser } = useUserStore();
  const [address, setAddress] = useState(null);
  const [courier, setCourier] = useState(null);
  const [shippingMethodArray, setShippingMethodArray] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const data = await fetchWithToken(
          "api/cart",
          getCookie("accessToken"),
          {
            cache: "no-store",
          }
        );
        const bankData = await fetchWithToken(
          "api/bank-accounts",
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
          const banks = bankData.data;
          setBankArray(banks);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        // Handle the error (e.g., show a toast message)
        toast.error("An error occurred. Please try again later.");
      }
    };
    if (isLoggedIn) {
      getData();
    }
  }, [token, router, isLoggedIn, logout, refresh, setShippingCost]);

  if (!cart) return;

  const handleSelectAddress = (e) => {
    if (e.target.value === "openmodal") {
      document.getElementById("my_modal_3").showModal();
    } else {
      setAddress(e.target.value);
      setCourier(null);
      setShippingCost(null);
      setShippingMethod(null);
      setShippingMethodArray(null);
    }
  };

  const handleClickCourier = async (courier) => {
    const body = {
      destination: address,
      weight: cart.total_weight,
      courier: courier,
    };
    if (!cart.total_weight > 0) {
      toast.error("The cart is empty");
      return;
    }

    setCourier(courier);
    const response = await fetchWithToken(
      "api/rajaongkir",
      getCookie(`accessToken`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    setShippingMethodArray(response.data);

    const data = await fetchWithToken("api/cart", getCookie("accessToken"), {
      cache: "no-store",
    });
    setCart(data.data);
  };

  const handleClickShippingCostAndMethod = async (e) => {
    const data = e.target.options[e.target.selectedIndex].getAttribute("cost");
    setShippingCost(+data);
    setShippingMethod(e.target.value);
  };

  const handleClickBankAccount = async (id) => {
    setSelectedBank(+id);
  };

  const handleCreateOrder = async () => {
    let body;
    if (
      !selectedBank ||
      !shippingMethod ||
      !shippingCost ||
      !address ||
      !courier
    ) {
      toast.error("Fill all the credentials");
      return;
    }
    if (selectedBank === 1) {
      body = {
        shipping_method: shippingMethod,
        shipping_cost: shippingCost,
        address_id: +address,
        courier: courier,
        bank_account_id: selectedBank,
        credit_card: true,
        total_price: cart.total_price,
        total_payment: cart.total_payment + shippingCost,
        total_weight: cart.total_weight,
        product_order_attributes: cart.CartProduct,
      };
    } else {
      body = {
        shipping_method: shippingMethod,
        shipping_cost: shippingCost,
        address_id: +address,
        courier: courier,
        bank_account_id: selectedBank,
        total_price: cart.total_price,
        total_payment: cart.total_payment + shippingCost,
        total_weight: cart.total_weight,
        product_order_attributes: cart.CartProduct,
      };
    }

    const response = await fetchWithToken(
      "api/order",
      getCookie(`accessToken`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response === "Internal Server Error" || response === "Bad Request") {
      toast.error(`Please fill all the credentials`);
    }
    if (response.status === "success") {
      setRefresh();
      router.push("/order");
    } else {
      toast.error(response.message);
    }
  };

  if (loading) {
    return <p> Loading ...</p>;
  }
  return (
    <div id="summary" className="lg:w-1/4 px-8 py-10  ">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Total Price</span>
        <span className="font-semibold text-sm">Rp{cart.total_price}</span>
      </div>
      <div className="my-3">
        <label className="font-medium  inline-block mb-3 text-sm uppercase">
          Address
        </label>
        <select
          className="block p-2 text-gray-600 w-full text-sm"
          placeholder="Select Address"
          defaultValue={"DEFAULT"}
          onChange={(e) => handleSelectAddress(e)}
        >
          <option value="DEFAULT" disabled>
            Choose shipping address
          </option>
          <option
            value={`openmodal`}
            // onChange={() => document.getElementById("my_modal_3").showModal()}
          >
            {" "}
            Add Address
          </option>

          {user.address?.map((address) => {
            return (
              <option value={address.id} key={address.id}>
                {address.name}, {address.street}, {address.city.name},{" "}
                {address.zip_code}{" "}
              </option>
            );
          })}
        </select>
      </div>
      {/* modal add address */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div method="dialog">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button> */}
            <AddressForm />
          </div>
        </div>
      </dialog>

      {address ? (
        <div>
          <label
            defaultValue={"DEFAULT"}
            className="font-medium inline-block mb-3 text-sm uppercase"
          >
            Courier
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="block p-2 text-gray-600 w-full text-sm"
            onChange={(e) => handleClickCourier(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Choose courier service
            </option>
            {courierOption.map((element) => (
              <option key={element.name} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {!courier ? null : courier && !shippingMethodArray ? (
        <span className=" my-4 loading loading-spinner loading-xs"></span>
      ) : (
        <div className="my-3">
          <label
            defaultValue={"DEFAULT"}
            className="font-medium inline-block mb-3 text-sm uppercase"
          >
            Shipping method
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="block p-2 text-gray-600 w-full text-sm"
            onChange={(e) => handleClickShippingCostAndMethod(e)}
          >
            <option value="DEFAULT" disabled>
              Choose shipping method
            </option>

            {shippingMethodArray?.map((element) => {
              const cost = element.cost[0];
              return (
                <option
                  key={element.service}
                  value={element.service}
                  cost={cost.value}
                >
                  {element.service} | {element.description}, Cost:Rp{" "}
                  {cost.value} {cost.etd} days
                </option>
              );
            })}
          </select>
        </div>
      )}

      {shippingMethod ? (
        <div className="my-3">
          <label
            defaultValue={"DEFAULT"}
            className="font-medium inline-block mb-3 text-sm uppercase"
          >
            Transfer method
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="block p-2 text-gray-600 w-full text-sm"
            onChange={(e) => handleClickBankAccount(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Choose transfer method
            </option>
            {bankArray.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.bank_name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}

      {/* <div className="py-10">
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
      </button> */}

      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Shipping Cost</span>
          <span>Rp{shippingCost || 0}</span>
        </div>
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>
            Rp{" "}
            {shippingCost
              ? cart.total_payment + shippingCost
              : cart.total_payment}
          </span>
        </div>
        <button
          onClick={() => handleCreateOrder()}
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
