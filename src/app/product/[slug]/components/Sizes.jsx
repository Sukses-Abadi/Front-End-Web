"use client";
import { baseUrl } from "@/lib/constant";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore } from "@/zustand";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export function Sizes(props) {
  const { sizes, discount } = props;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const sizeArray = Object.keys(sizes);
  const [count, setCount] = useState(1);
  const [stock, setStock] = useState(null);
  const { refresh, setRefresh, token } = useAuthStore();
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleColor = (product_details_id, stock) => {
    setSelectedProduct(product_details_id);
    setStock(stock);
  };

  const handleClick = (size) => {
    setPrice(sizes[size].data[0].price);
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!getCookie("accessToken")) {
      toast.error("please login to your account");
      return;
    }
    if (!selectedProduct) {
      toast.error(`Please choose size and color`);
      return;
    }
    if (stock == 0) {
      toast.error("Item is out of stock, please select another item");
      router.refresh();
      return;
    }
    if (stock < count) {
      toast.error("Stock insufficient");
      router.refresh();
      return;
    }
    const data = {
      product_details: {
        id: selectedProduct, // Assuming you have a productId
        quantity: count,
        price: price - discount,
      },
    };
    try {
      const response = await fetchWithToken("api/cart", token, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Adjust content type if needed
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      if (response.status === "success") {
        // Cart item was successfully added
        toast.success(response.message);
        setRefresh();
      } else {
        // Handle error if request was not successful
        console.error("Error adding item to cart");
      }
    } catch (error) {
      toast.error(`Please choose size and color`);
      console.error("Error:", error);
    }
    setCount(1);
  };

  const colorList = [];

  return (
    <>
      {/* Size */}
      <label className="text-gray-700 text-sm" htmlFor="size">
        Size:
      </label>
      <div className="flex  items-center my-3">
        <br />

        {sizeArray.map((element) => {
          return (
            <button
              key={element}
              className={` ${
                selectedSize === element
                  ? "bg-blue-500  border-2"
                  : " border-white"
              }  h-6 w-6 mr-2 text-gray-700 text-sm`}
              onClick={() => handleClick(`${element}`)}
            >
              {element}
            </button>
          );
        })}
        <br />
      </div>
      <label className="text-gray-700 text-sm" htmlFor="color">
        Color:
      </label>{" "}
      {/* Color */}
      <div className="my-3">
        {selectedSize
          ? sizes[selectedSize].data.map((element) => {
              if (colorList.includes(element.color)) {
                return;
              } else {
                colorList.push(element.color);
              }
              return (
                <button
                  key={element.id}
                  onClick={() => handleColor(element.id, element.stock)}
                  className={`h-5 w-5 border-2 rounded-full ${
                    selectedProduct === element.id
                      ? "border-blue-800"
                      : "border-gray-500"
                  } bg-${element.color}-600 mr-2 focus:outline-none`}
                  style={{ backgroundColor: element.color }}
                ></button>
              );
            })
          : null}
        <span className="text-gray-500 mt-1">
          Rp. {price}{" "}
          {discount ? (
            <span className="badge relative bottom-1 badge-xs badge-primary">
              ${discount} OFF
            </span>
          ) : null}
        </span>
      </div>
      {stock ? (
        <label className="text-gray-700 text-sm" htmlFor="color">
          Stock : {stock}
        </label>
      ) : null}
      {stock === 0 ? (
        <label className="text-red-700 text-sm" htmlFor="color">
          ITEM IS OUT OF STOCK, PLEASE WAIT FOR FURTHER UPDATE !
        </label>
      ) : null}
      <hr className="my-3" />
      <div className="mt-2">
        <label className="text-gray-700 text-sm" htmlFor="quantity">
          Quantity:
        </label>
        {/* quantity */}
        <div className="flex items-center mt-1">
          <button
            onClick={decrement}
            className="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
          <span className="text-gray-700 text-lg mx-2">{count}</span>
          <button
            onClick={increment}
            className="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* add to cart */}
      <div className="flex items-center mt-6">
        <button
          onClick={handleAddToCart}
          className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Add to Cart
          <svg
            className="h-5 w-5 ml-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>{" "}
        </button>
      </div>
    </>
  );
}
