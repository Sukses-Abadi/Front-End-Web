import fetchWithToken from "@/lib/fetchWithToken";
import { cookies } from "next/headers";
import FormReview from "./FormReview";
import { redirect } from "next/navigation";
import Image from "next/image";
import { baseUrl } from "@/lib/constant";

export default async function page({ params }) {
  const token = cookies().get("accessToken");
  const response = await fetchWithToken(`api/order/${params.id}`, token.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (response.error === "Unauthorized" || response.data.status !== "complete") {
    redirect("/");
  }
  const orders = Array.isArray(response.data)
    ? [...response.data]
    : [response.data];
  const productDetails = orders[0].orderProducts[0].ProductDetails;
  const product_id = productDetails.product_id;
  const photo = productDetails.product.productGalleries[0].photo;
  return (
    <>
      <div className="py-28">
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
    </>
  );
}
