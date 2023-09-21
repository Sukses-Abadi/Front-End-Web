"use client";
import { baseUrl } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Sizes(props) {
  const { sizes } = props;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const sizeArray = Object.keys(sizes);
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleColor = (product_details_id, price) => {
    console.log(product_details_id);
    setPrice(price);
    setSelectedProduct(product_details_id);
  };

  const handleClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    const data = {
      product_details: {
        id: selectedProduct, // Assuming you have a productId
        quantity: count,
        price: price,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY5NTMxMzMyMiwiZXhwIjoxNjk1MzE2OTIyfQ.AWlg0XJEh4qavmcqH0BefHsvKlKqMxZIIbl_YApj4rI",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Cart item was successfully added
        console.log("Item added to cart!");
      } else {
        // Handle error if request was not successful
        console.error("Error adding item to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                selectedSize === element ? "bg-blue-500" : " border-white"
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
                <>
                  <button
                    onClick={() => handleColor(element.id, element.price)}
                    key={element.id}
                    className={`h-5 w-5 border-2 rounded-full ${
                      selectedProduct === element.id
                        ? "border-blue-500"
                        : "border-gray-500"
                    } bg-${element.color}-600 mr-2 focus:outline-none`}
                    style={{ backgroundColor: element.color }}
                  ></button>
                </>
              );
            })
          : null}
        <span className="text-gray-500 mt-1">Rp. {price}</span>
      </div>
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