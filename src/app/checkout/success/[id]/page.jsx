import fetchWithTokenServer from "@/lib/fetchWithTokenServer";
import Link from "next/link";
import React from "react";

export default async function page({ params }) {
  console.log(params);
  const body = { order_id: +params.id, status: "received" };
  const response = await fetchWithTokenServer("api/order/", "PUT", {
    body: JSON.stringify(body),
  });

  return (
    <section>
      <Link
        href="/"
        className="flex font-semibold text-blue-400 text-sm mb-10 mx-10"
      >
        <svg
          className="fill-current mr-2 text-indigo-600 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Back to Homepage
      </Link>
      <h1 className=" min-h-[51vh] text-2xl font-bold font-mono m-20">
        We appreciate your business! If you have any questions, please email
      </h1>
    </section>
  );
}
