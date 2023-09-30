import fetchWithToken from "@/lib/fetchWithToken";
import { cookies } from "next/headers";
import FormReview from "./FormReview";
import { redirect } from "next/navigation";
import Image from "next/image";
import { baseUrl } from "@/lib/constant";
import Link from "next/link";

export default async function page({ params }) {
  const token = cookies().get("accessToken");
  const response = await fetchWithToken(`api/order/${params.id}`, token.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (
    response.error === "Unauthorized" ||
    response.data?.status !== "complete" ||
    response.data.review === true
  ) {
    redirect("/");
  }
  const orderedProducts = response.data.orderProducts;
  const orders = Array.isArray(response.data)
    ? [...response.data]
    : [response.data];
  const productDetails = orders[0].orderProducts[0].ProductDetails;
  const product_id = productDetails.product_id;
  const photo = productDetails.product.productGalleries[0].photo;
  return (
    <>
      <Link
        href="/"
        className="flex font-semibold text-blue-400 text-sm mt-10 ml-10"
      >
        <svg
          className="fill-current mr-2 text-indigo-600 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Back to Homepage
      </Link>
      {orderedProducts.map((orderedProduct) => {
        const productDetails = orderedProduct.ProductDetails;
        const photo = productDetails.product.productGalleries[0].photo;
        const product_id = productDetails.product_id;
        return (
          <div key={orderedProduct.id} className="py-28">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="hidden lg:block lg:w-1/2 bg-cover ">
                <Image
                  className="m-auto"
                  alt="Coolest Brand ver!"
                  src={`${baseUrl}/${photo}`}
                  width={500}
                  height={500}
                />
              </div>
              {orders.map((order) => (
                <FormReview
                  key={order.id}
                  order={order}
                  productId={product_id}
                  productDetails={productDetails}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
