"use client";
import fetchData from "@/lib/fetch";
import Image from "next/image";

export default function Home() {
  const handleClick = async () => {
    const response = await fetchData("api/products", "GET");
    console.log(response);
    console.log(`clicked`);
    return response;
  };

  return <main className=" bg-base-100 text-6xl p-5 m-2">HomePage</main>;
}
