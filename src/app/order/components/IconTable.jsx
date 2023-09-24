"use client";
import React from "react";

export default function IconTable({ order }) {
  return (
    <td className="py-3 px-6 text-center">
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
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Order Details!</h3>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Order Date</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.order_date}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>address</p>
              </div>
              <div className="md:w-2/3">
                <p>
                  {order.address.street},{order.address.zip_code}
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Total Price</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.total_price}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Total Weight</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.total_weight} gram</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Courier</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.courier}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Shipping Method</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.shipping_method}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Tracking Number</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.tracking_number}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Shipping Cost</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.shipping_cost}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Total Cost</p>
              </div>
              <div className="md:w-2/3">
                <p>Rp. {order.total_payment}</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 my-2">
                <p>Payment Receipt</p>
              </div>
              <div className="md:w-2/3">
                <p>{order.payment_receipt}</p>
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
        <div
          type="file"
          className=" tooltip tooltip-success transform hover:text-purple-500 hover:scale-100"
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
          <input
            type="file"
            className="file-input file-input-bordered file-input-xs w-full max-w-xs"
          />
        </div>
      </div>
    </td>
  );
}
