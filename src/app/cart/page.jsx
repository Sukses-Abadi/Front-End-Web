"use client";
import { baseUrl } from "@/lib/constant";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore } from "@/zustand";

import { deleteCookie, getCookie, getCookies } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderDetails from "./components/OrderDetails";

export default function Page() {
  const { token, isLoggedIn, logout, refresh, setRefresh } = useAuthStore(); // Assuming you have a logout function
  const router = useRouter();
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(null);
  // const [quantity, setQuantity] = useState();
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchWithToken(
          "api/cart",
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
          const items = cart.CartProduct;
          setCartProduct(items);
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
  }, [token, router, isLoggedIn, logout, rerender, refresh]);

  const handleDeleteItem = async (cartProductID) => {
    try {
      const response = await fetchWithToken(
        `api/cart/${cartProductID}`,
        getCookie("accessToken"),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh();
      setRerender((prevRerender) => !prevRerender);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      // Make an API request to update the quantity
      const response = await fetchWithToken(
        `api/cartproduct/${itemId}`,
        getCookie("accessToken"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (response.status === "success") {
        setRefresh();
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error
    }
  };

  const handleIncrement = (item) => {
    setCartProduct((prevCartProduct) =>
      prevCartProduct.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      setCartProduct((prevCartProduct) =>
        prevCartProduct.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
      updateCartItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);

    if (!Number.isNaN(newQuantity) && newQuantity >= 1) {
      setCartProduct((prevCartProduct) =>
        prevCartProduct.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
      updateCartItemQuantity(item.id, newQuantity);
    }
  };
  return (
    <div className="bg-gray-100 min-h-[63vh]">
      <div className="container mx-auto mt-10">
        <div className="md:flex shadow-md my-10">
          <div className="md:w-3/4  bg-white my-10 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartProduct.length} Items
              </h2>
            </div>
            {/* Table Head */}
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>

              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>

            {cartProduct.map((item) => {
              const price = item.price;
              const quantity = item.quantity;
              const product_details = item.ProductDetails;
              const color = product_details.color;
              const size = product_details.size;
              const product = product_details.product;
              const name = product.name;
              const description = product.description;
              const discount = product.discount;
              const weight = product.weight;
              const photo = product.productGalleries;
              const stock = product_details.stock;
              return (
                <div
                  key={item.id}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    {/* <!-- product --> */}
                    <div className="w-20">
                      <Image
                        className="h-24"
                        src={`${photo[0].photo}`}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm"> {product.name}</span>
                      <span className="text-red-500 text-xs">{size}</span>
                      <span
                        className={`h-5 w-5 border-2 rounded-full border-blue-300  mr-2 focus:outline-none`}
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="text-gray-700 text-xs">
                        Stock :{stock}
                      </span>
                      <a
                        onClick={() => handleDeleteItem(item.id)}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                  {/* quantity counter */}
                  <div className="flex justify-center w-1/5">
                    <svg
                      onClick={() => handleDecrement(item)}
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, e.target.value)
                      }
                    />

                    <svg
                      onClick={() => handleIncrement(item)}
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {item.price * quantity}
                  </span>
                </div>
              );
            })}

            {/* continue Shopping */}
            <div className="w-full">
              <Link
                href="/"
                className=" inline-flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
          {/* {Order Summary} */}
          <OrderDetails />
        </div>
      </div>
    </div>
  );
}
