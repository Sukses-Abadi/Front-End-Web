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

  const handleReview = (orderId) => {
    router.push(`/review/${orderId}`);
  };

  let photo = [];
  const orderedProducts = order.orderProducts;
  return (
    <td className="py-3 mr-2 text-center">
      <div className="flex item-center justify-center ml-10">
        {/* see more */}
        <div
          onClick={() => document.getElementById("my_modal_3").showModal()}
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

        <dialog id="my_modal_3" className="modal overflow-auto">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg mb-2">Order Details!</h3>
            <div className="md:flex md:items-center mb-3 ">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Order Date</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.order_date}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">address</p>
              </div>
              <div className="md:w-2/3">
                <p>
                  {order.address.street},{order.address.zip_code}
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Total Price</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.total_price}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Total Weight</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.total_weight} gram</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Courier</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.courier}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Shipping Method</p>
              </div>
              <div className="md:w-2/3">
                <p className="">{order.shipping_method}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Tracking Number</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.tracking_number}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Shipping Cost</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.shipping_cost}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Total Cost</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.total_payment}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p className="font-semibold">Payment Receipt</p>
              </div>
              <div className="md:w-2/3">
                {order.payment_receipt ? (
                  <Image
                    src={`${baseUrl}/${order.payment_receipt}`}
                    alt="File Preview"
                    className=" mx-auto ml-10 "
                    width={500}
                    height={500}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </dialog>
        {/* delete */}
        {/* <div
          className="w-4 tooltip tooltip-success mr-2 transform hover:text-purple-500 hover:scale-110"
          data-tip="Delete record"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div> */}
        {/* Upload */}
        {order.status === "complete" ? (
          <>
            <button
              className="btn btn-xs btn-neutral"
              onClick={() => {
                handleReview(order.id);
              }}
            >
              Review
            </button>
            {/* <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Transaction Completed!</h3>
                <p className="pt-4 font-semibold">
                  Your feedback matters. Leave a review?
                </p>
                <div className="justify-center mt-4">
                  <form method="dialog">
                    <button className="btn btn-sm ">Later</button>
                    <button
                      type="button"
                      className="btn btn-sm ml-5 btn-neutral"
                      // onClick={handleReview}
                    >
                      {order.id}Yes!{orderId}
                    </button>
                  </form>
                </div>
              </div>
            </dialog> */}
          </>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="flex tooltip tooltip-success transform hover:text-purple-500 hover:scale-100 flex-wrap"
            data-tip="Upload transfer "
          >
            {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg> */}
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
        )}
      </div>
    </td>
  );
}
