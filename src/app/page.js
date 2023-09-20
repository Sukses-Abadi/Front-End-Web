"use client";

import Carousel from "@/components/home/carousel";
import fetchData from "@/fetch";
import { useEffect } from "react";

export default function Home() {
  const fetchProduct = async () => {
    try {
      const response = await fetchData("api/products", {
        method: "GET",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  });

  return (
    <>
      <Carousel />
      <h2 className=" bg-base-100 text-6xl">HOMEPAGE!</h2>
    </>
  );
}
