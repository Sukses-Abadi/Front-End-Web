import { baseUrl } from "@/lib/constant";
import fetchWithToken from "@/lib/fetchWithToken";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { redirect } from "next/navigation";
import IconTable from "./components/IconTable";

export default async function page() {
  const token = cookies().get("accessToken");
  if (!token) redirect("/");
  const response = await fetchWithToken(`api/order`, token.value, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (response.error === "Unauthorized") {
    redirect("/");
  }

  // console.log(response);
  const orders = response.data.orders;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-auto">
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

                {orders.map((order) => {
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
                                : "Red" || order.status === "received"
                                ? "#E0C7FE"
                                : "Red" || order.status === "rejected"
                                ? "#F6AA97"
                                : "Red" || order.status === "shipped"
                                ? "#F7D0AF"
                                : "Red" || order.status === "completed"
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
                      {/* <td className="py-3 px-6 text-center"> */}
                      <IconTable order={order} />
                      {/* </td> */}
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
    </div>
  );
}
