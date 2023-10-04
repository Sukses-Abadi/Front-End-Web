"use client";

import fetchData from "@/fetch";
import { baseUrl } from "@/lib/constant";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore } from "@/zustand";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function IconTable({ order }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState("");
  const { setRefresh } = useAuthStore();
  const router = useRouter();

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
    // Generate a preview for the selected file
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target.result);
    };

    reader.readAsDataURL(files[0]); // Display preview for the first file
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const data = await fetchWithToken(
        "api/uploads",
        getCookie(`accessToken`),
        {
          method: "POST",
          body: formData,
        }
      );

      if (data.length > 0) {
        data.map(async (file) => {
          const body = {
            order_id: order.id,
            payment_receipt: file.photo,
            status: "received",
          };
          const res = await fetchWithToken(
            "api/order",
            getCookie(`accessToken`),
            {
              method: "PUT",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success(`${res.message}`);
          setRefresh();
          router.refresh();
        });
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleReview = async (orderId) => {
    router.push(`/review/${orderId}`);
  };

  const handleStatusComplete = async (orderId) => {
    const body = {
      order_id: orderId,
      status: "complete",
    };
    const res = await fetchWithToken("api/order", getCookie(`accessToken`), {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(`Status updated`);
    setRefresh();
    router.refresh();
  };
  const handleCheckout = async () => {
    const body = {
      id: order.id,
      total_payment: order.total_payment,
    };
    const response = await fetch(
      "http://localhost:5000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    console.log(session);
    if (session) {
      router.push(`${session.url}`);
    }
  };
  return (
    <td className="py-3 mr-2 flex-1 text-left">
      <div className="flex  ml-10">
        {/* see more */}
        <div
          onClick={() => router.push(`order/${order.id}`)}
          className="w-4 mr-5 mt-1 tooltip tooltip-success transform hover:text-purple-500 hover:scale-110"
          data-tip="see more detail"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        {/* checkout */}
        {order.credit_card === true && order.status === "waiting" ? (
          <button
            className=" py-1 px-2 bg-gray-100 border-2 rounded-md"
            type="submit"
            id="checkout-button"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        ) : null}
        {/* Upload */}

        {(order.status === "waiting" && order.credit_card === false) ||
        (order.status === "received" && order.credit_card === false) ? (
          <form
            onSubmit={handleFormSubmit}
            className="flex tooltip tooltip-success transform hover:text-purple-500 hover:scale-100 flex-wrap"
            data-tip="Upload transfer "
          >
            {/* Display file preview */}
            {filePreview && (
              <Image
                src={filePreview}
                alt="File Preview"
                className="max-w-xs mx-auto ml-10 h-32"
                width={500}
                height={500}
              />
            )}
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-xs w-full max-w-xs text-xs md:text-md  self-center"
            />
            <button
              className="p-1  bg-blue-400 text-white rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : null}

        {order.status === "shipped" ? (
          <div className=" text-left">
            <button
              className="btn btn-xs btn-neutral"
              onClick={() => {
                handleStatusComplete(order.id);
              }}
            >
              Order Arrived!
            </button>
          </div>
        ) : null}
        {order.status === "complete" && order.review === false ? (
          <>
            <button
              className="btn btn-xs btn-neutral"
              onClick={() => {
                handleReview(order.id);
              }}
            >
              Review
            </button>
          </>
        ) : null}
        {order.status === "complete" && order.review === true ? (
          <>
            <p>Thank you for the reviews!</p>
          </>
        ) : null}
      </div>
    </td>
  );
}
