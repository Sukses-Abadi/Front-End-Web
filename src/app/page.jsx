"use client";
import Card from "@/components/home/card";
import Carousel from "@/components/home/carousel";
import Container from "@/components/home/container.grid";
import fetchData from "@/fetch";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [bestSeller, setBestSeller] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    const url =
      "api/products" +
      `?page=${page}` +
      `&limit=${limit}` +
      `&maxPrice=${maxPrice}` +
      `&minPrice=${minPrice}`;
    async function fetchProduct() {
      const { data } = await fetchData(url, "GET", {
        cache: "no-store",
      });
      setData(data);
      const response = await fetchData("api/products/best-seller", "GET", {
        cache: "no-store",
      });
      setBestSeller(response.data);
    }
    fetchProduct();
  }, [page, limit, maxPrice, minPrice, setMaxPrice, setMinPrice]);

  const handlePage = async (value) => {
    setPage(value);
  };

  const renderPageButtons = () => {
    const currentPage = data.currentPage;
    const totalPages = data.totalPages;
    const pageButtons = [];

    // Calculate the range for the first three buttons
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    // Render first three buttons
    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePage(i)}
          className={`relative ${
            currentPage === i
              ? "z-10 bg-indigo-600 text-white"
              : "text-gray-900"
          } inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > 6 && currentPage < totalPages - 3) {
      pageButtons.push(
        <span
          key="ellipsis-start"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
        >
          ...
        </span>
      );
    }

    // Check if the last two buttons are lined up with the first three buttons
    const lastTwoLinedUp = totalPages <= currentPage + 2;
    // Render last two buttons without ellipsis
    if (!lastTwoLinedUp) {
      for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePage(i)}
            className={`relative ${
              currentPage === i
                ? "z-10 bg-indigo-600 text-white"
                : "text-gray-900"
            } inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
          >
            {i}
          </button>
        );
      }
    }

    return pageButtons;
  };
  const handleLimit = async (value) => {
    setLimit(value);
    setPage(1);
  };
  const handleMaxPriceSubmit = async (e) => {
    e.preventDefault();
    setMaxPrice(e.target.q.value);
  };
  const handleMinPriceSubmit = async (e) => {
    e.preventDefault();
    setMinPrice(e.target.q.value);
  };

  if (!data || !bestSeller) return;

  return (
    <>
      <div className="mx-20 mt-7 text-left font-bold text-2xl text-primary">
        {" "}
        BEST SELLER
      </div>
      <div className="divider"></div>
      <Container>
        {/* <div className="inline-flex gap-5 ml-5 flex-wrap"> */}
        {bestSeller.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
        {/* </div> */}
      </Container>
      <div className="divider"></div>
      <Carousel />
      {/* Set Limit */}
      <div className="flex items-center justify-center py-1 md:py-4 ">
        <header className="text-primary text-3xl font-bold px-5 py-2.5 text-center mr-3 mb-1">
          Our Products
        </header>
      </div>
      <div className="flex flex-row-reverse ml-10">
        <div className="my-5 mr-5 inline-flex">
          <div className="py-2 ml-4 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
            <p>Show Entries:</p>
            <select
              aria-label="select"
              className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              onChange={(e) => handleLimit(e.target.value)}
              defaultValue={"8"}
            >
              <option value={"4"} className="text-sm text-indigo-800">
                4
              </option>
              <option value={"8"} className="text-sm text-indigo-800">
                8
              </option>
              <option value={"12"} className="text-indigo-800">
                12
              </option>
              <option value={"16"} className="text-indigo-800">
                16
              </option>
              <option value={"20"} className="text-indigo-800">
                20
              </option>
            </select>
          </div>
        </div>
        <div className="py-3 ml-4 px-4 flex flex-wrap items-center gap-4 text-sm font-medium leading-none  cursor-pointer rounded">
          <form onSubmit={handleMinPriceSubmit}>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <Image src="/icon/rupiah.svg" alt="" width={22} height={22} />
                </button>
              </span>
              <input
                // value={minPrice}
                type="number"
                name="q"
                className="py-2 text-sm w-[180px] text-gray-800 font-semibold bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Minimum Price"
                autoComplete="off"
              />
            </div>
          </form>
          <form onSubmit={handleMaxPriceSubmit}>
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <Image src="/icon/rupiah.svg" alt="" width={22} height={22} />
                </button>
              </span>
              <input
                // value={maxPrice}
                type="number"
                name="q"
                className="py-2 w-[180px] text-sm text-gray-800 font-semibold bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Maximum Price"
                autoComplete="off"
              />
            </div>
          </form>
        </div>
        {/* delete Filter */}
      </div>
      <div className="py-3 ml-4 px-4 inline-flex  flex-wrap items-center gap-4 text-sm font-medium leading-none  cursor-pointer rounded">
        {maxPrice > 0 ? (
          <div className=" text-gray-600 focus-within:text-gray-400">
            <button
              onClick={() => setMaxPrice("")}
              className="p-2 border-2 rounded-md focus:outline-none focus:shadow-outline"
            >
              <span className="flex gap-2">
                Maximum Price
                <Image src="/icon/x.svg" alt="" width={15} height={15} />
              </span>
            </button>
          </div>
        ) : null}

        {minPrice > 0 ? (
          <div className=" text-gray-600 focus-within:text-gray-400">
            <button
              onClick={() => setMinPrice("")}
              className="p-2 border-2 rounded-md focus:outline-none focus:shadow-outline"
            >
              <span className="flex gap-2">
                Minimum Price
                <Image src="/icon/x.svg" alt="" width={15} height={15} />
              </span>
            </button>
          </div>
        ) : null}
      </div>
      <Container>
        {data.products?.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </Container>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(data.currentPage - 1) * data.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {data.currentPage * data.limit < data.totalItems
                  ? data.currentPage * data.limit
                  : data.totalItems}
              </span>{" "}
              of <span className="font-medium">{data.totalItems}</span> results
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* ... */}
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePage(data.currentPage - 1)}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  data.currentPage === 1 ? "hidden" : ""
                }`}
              >
                Previous
              </button>

              {renderPageButtons()}

              <button
                onClick={() => handlePage(data.currentPage + 1)}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  data.currentPage === data.totalPages ? "hidden" : ""
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
