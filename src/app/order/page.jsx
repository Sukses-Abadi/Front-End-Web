"use client";
import { baseUrl } from "@/lib/constant";
import fetchWithToken from "@/lib/fetchWithToken";

import Image from "next/image";
import Link from "next/link";
import IconTable from "./components/IconTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchWithTokenClient from "@/lib/fetchWithTokenClient";
import { useAuthStore } from "@/zustand";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState();
  const [dateFilter, setDateFilter] = useState("desc");
  const [activeLink, setActiveLink] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("10");
  const [trackingUpdate, setTrackingUpdate] = useState("");
  const [q, setQ] = useState("");
  const { refresh } = useAuthStore();
  useEffect(() => {
    const fetchData = async () => {
      let url =
        `api/order?` +
        `sortOrder=${dateFilter}` +
        `&status=${activeLink}` +
        `&page=${page}` +
        `&limit=${limit}`;
      const data = await fetchWithTokenClient(url, "GET", {
        cache: "no-store",
      });
      if (data === "Unauthorized") {
        router.push("/");
      }
      setData(data.data);
    };
    fetchData();
  }, [dateFilter, page, activeLink, limit, trackingUpdate, refresh, router]);

  const handleLinkClick = (status) => {
    setActiveLink(status);
    setPage(1);
  };

  const handleSort = async (value) => {
    setDateFilter(value);
    setPage(1);
  };

  const handlePage = async (value) => {
    setPage(value);
  };

  const handleLimit = async (value) => {
    setLimit(value);
    setPage(1);
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
  if (!data) return;
  // console.log(data);
  const orders = data.orders;

  return (
    <div className="overflow-x-auto min-h-[67vh]">
      {/* FILTER BY DATE */}
      <div className="px-4 md:px-10 py-4 md:py-7 ">
        <div className="flex items-center justify-between flex-wrap">
          <p
            tabIndex="0"
            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
          >
            Orders
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Show Entries:</p>
              <select
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                onChange={(e) => handleLimit(e.target.value)}
                defaultValue={"10"}
              >
                <option value={"5"} className="text-sm text-indigo-800">
                  5
                </option>
                <option value={"10"} className="text-sm text-indigo-800">
                  10
                </option>
                <option value={"20"} className="text-indigo-800">
                  20
                </option>
                <option value={"50"} className="text-indigo-800">
                  50
                </option>
              </select>
            </div>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort By:</p>
              <select
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                onChange={(e) => handleSort(e.target.value)}
                defaultValue={"desc"}
              >
                <option value={"desc"} className="text-sm text-indigo-800">
                  Latest
                </option>
                <option value={"asc"} className="text-indigo-800">
                  Oldest
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* STATUS FILTER */}
      <div className="flex gap-1 my-2 ml-28 items-center flex-wrap">
        <a
          className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ${
            activeLink === "" ? "bg-indigo-100 text-indigo-700" : ""
          }`}
          onClick={() => handleLinkClick("")}
        >
          <div className="py-2 px-8 rounded-full">
            <p>All</p>
          </div>
        </a>
        <a
          className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ${
            activeLink === "waiting" ? "bg-indigo-100 text-indigo-700" : ""
          }`}
          onClick={() => handleLinkClick("waiting")}
        >
          <div className="py-2 px-8 rounded-full">
            <p>Waiting</p>
          </div>
        </a>
        <a
          className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 ${
            activeLink === "received" ? "bg-indigo-100 text-indigo-700" : ""
          }`}
          onClick={() => handleLinkClick("received")}
        >
          <div className="py-2 px-8 rounded-full">
            <p>Received</p>
          </div>
        </a>
        <a
          className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 ${
            activeLink === "shipped" ? "bg-indigo-100 text-indigo-700" : ""
          }`}
          onClick={() => handleLinkClick("shipped")}
        >
          <div className="py-2 px-8 rounded-full">
            <p>Shipped</p>
          </div>
        </a>
        <a
          className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 ${
            activeLink === "complete" ? "bg-indigo-100 text-indigo-700" : ""
          }`}
          onClick={() => handleLinkClick("complete")}
        >
          <div className="py-2 px-8 rounded-full">
            <p>Completed</p>
          </div>
        </a>
      </div>
      <div className="min-w-screen flex items-center justify-center bg-gray-100 font-sans overflow-auto">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              {/* TABLE HEAD */}
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Bank Info</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-center hidden md:flex">
                    Product
                  </th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {/* ROW <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

                {orders?.map((order) => {
                  const bank = order.bankAccount;
                  const orderedProducts = order.orderProducts;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      {/* BANK */}
                      <td className="py-3 px-6 text-left whitetext-xs md:text-mdspace-nowrap text-xs md:text-md">
                        <div className="flex items-center">
                          <span className="font-medium">
                            {bank.bank_name}
                            <br /> {bank.account_holder}
                            <br /> {bank.account_number}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-left text-xs md:text-md">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span>Rp. {order.total_payment}</span>
                        </div>
                      </td>
                      {/* PRODUCT */}
                      <td className="py-3 px-6 text-center hidden md:flex text-xs md:text-md">
                        <div className="flex items-center justify-center">
                          {orderedProducts.map((orderedProduct) => {
                            const productDetails =
                              orderedProduct.ProductDetails;
                            // console.log(productDetails)
                            const product = productDetails.product;
                            const photos = product.productGalleries;
                            return (
                              <Link
                                key={orderedProduct.id}
                                href={`/product/${product.slug}`}
                                className="flex-col"
                              >
                                <Image
                                  className="w-10 h-10 rounded-full border-gray-200 border transform hover:scale-125"
                                  src={`${baseUrl}/${photos[0].photo}`}
                                  alt={product.name}
                                  width={100}
                                  height={100}
                                />
                                <span className=" text-bold">
                                  {productDetails.size}
                                </span>
                                <br />
                                <div
                                  className={`h-4 w-4 ml-3 mt-1 border-2 border-stale-500 rounded-full focus:outline-none`}
                                  style={{
                                    backgroundColor: productDetails.color,
                                  }}
                                ></div>
                              </Link>
                            );
                          })}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <span
                          className="bg-purple-200 font-semibold text-gray-700 py-1 px-3 rounded-full text-[10px]"
                          style={{
                            backgroundColor:
                              order.status === "waiting"
                                ? "#8DD1F0"
                                : order.status === "received"
                                ? "#E0C7FE"
                                : order.status === "rejected"
                                ? "#F6AA97"
                                : order.status === "shipped"
                                ? "#F7D0AF"
                                : order.status === "complete"
                                ? "#93EF93"
                                : "Red",
                          }}
                        >
                          {order.status === "waiting"
                            ? "Waiting for payment"
                            : null}
                          {order.status === "received"
                            ? "Payment has been received"
                            : null}
                          {order.status === "rejected"
                            ? "Payment is rejected"
                            : null}
                          {order.status === "shipped"
                            ? "Item has been shipped"
                            : null}
                          {order.status === "complete"
                            ? "transaction has been completed"
                            : null}
                        </span>
                      </td>

                      <IconTable order={order} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Link href="/" className="flex font-semibold text-blue-400 text-sm mt-10">
        <svg
          className="fill-current mr-2 text-indigo-600 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Back to Homepage
      </Link>
      {/* pagination */}
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
                {(data.currentPage - 1) * data.limit + 1 + data.limit - 1}
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
                } ${data.totalPages === null ? "hidden" : ""}`}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
