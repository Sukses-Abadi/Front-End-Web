"use client";
import fetchData from "@/lib/fetch";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Reviews({ product_id }) {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const url =
      `api/review?product_id=${product_id}` +
      `page=${page}` +
      `&limit=${limit}`;
    console.log(url);
    const fetchProduct = async () => {
      try {
        const { data } = await fetchData(url, "GET", {
          cache: "no-store",
        });
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [limit, page, setPage, product_id]);

  const handlePage = async (value) => {
    console.log(" PAGE" + value);
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

  if (!data) return;
  console.log(data);
  return (
    <div className="m-10 ">
      <div>Review</div>
      <div className="divider"></div>
      <div className="flex flex-col gap-3 mt-8">
        {data.reviews.map((review) => {
          const name = review.user.first_name;
          const userPhoto = review.user.photo;
          const userPhotoUrl = `http://localhost:5000/${userPhoto}`;
          const date = review.created_at;
          const rating = review.rating;
          const reviewImage = review.image;
          const image = `http:localhost:5000/${review.image}`;
          const text = review.review_text;
          const year = date.split("-")[0];
          function getMonthName(month) {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index

            if (monthIndex >= 0 && monthIndex < monthNames.length) {
              return monthNames[monthIndex];
            } else {
              return "Invalid Month";
            }
          }
          const month = getMonthName(date.split("-")[1]);

          function StarRating({ rating }) {
            const starIcons = [];

            for (let i = 1; i <= 5; i++) {
              if (i <= rating) {
                starIcons.push(
                  <ion-icon key={i} name="star">
                    ⭐
                  </ion-icon>
                );
              } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                starIcons.push(<ion-icon key={i} name="star-half"></ion-icon>);
              } else {
                starIcons.push(
                  <ion-icon key={i} name="star-outline"></ion-icon>
                );
              }
            }

            return <div>{starIcons}</div>;
          }

          return (
            <div key={review.id} className="flex flex-col gap-4 p-4">
              {/* <!-- Profile and Rating --> */}

              <div className="flex justify justify-between">
                {/* user photo and name */}
                <div className="flex gap-2">
                  <div className="  text-center rounded-full">
                    <Image
                      alt=""
                      src={
                        !userPhoto
                          ? "https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          : userPhotoUrl
                      }
                      width={28}
                      height={28}
                    />
                  </div>
                  <span>{name}</span>
                </div>
                {/* rating */}
                <div className="flex p-1 gap-1 text-orange-300">
                  {StarRating({ rating })}
                  <div>Rating:{rating}</div>
                </div>
              </div>
              {reviewImage ? (
                <Image alt="" src={image} width={150} height={150} />
              ) : null}

              <div>{text}</div>

              <div className="flex justify-between">
                <span>
                  {month}, {year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
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
    </div>
  );
}
