"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TransferReceipt({ data }) {
  const router = useRouter();
  const orderedProduct = data.orderProducts;

  return (
    <div className="border-2 rounded-lg p-10 flex-1 min-w-[370px] bg-slate-50">
      {" "}
      <div className="flex justify-between items-center py-2">
        <h1 className=" font-bold text-xl text-left py-8 border-b-2 flex-1">
          Transfer Receipt
        </h1>
      </div>
      <div>
        {data.payment_receipt ? (
          <div className="flex items-center justify-center">
            <Image
              className="w-auto h-auto"
              onClick={() => router.push(`${data.payment_receipt}`)}
              src={`${data.payment_receipt}`}
              alt={data.payment_receipt}
              height={200}
              width={200}
            />
          </div>
        ) : (
          "No payment receipt is submitted"
        )}
      </div>
    </div>
  );
}
