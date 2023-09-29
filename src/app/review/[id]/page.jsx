import fetchWithToken from "@/lib/fetchWithToken";
import { cookies } from "next/headers";
import FormReview from "./FormReview";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const token = cookies().get("accessToken");
  const response = await fetchWithToken(`api/order/${params.id}`, token.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (response.error === "Unauthorized") {
    redirect("/");
  }
  const orders = Array.isArray(response.data)
    ? [...response.data]
    : [response.data];
  const productDetails = orders[0].orderProducts[0].ProductDetails;
  const product_id = productDetails.product_id;
  return (
    <>
      <div>
        <h1 className="text-4xl">Review {productDetails.product.name}</h1>
        {orders.map((order) => (
          <FormReview key={order.id} order={order} productId={product_id} />
        ))}
      </div>
    </>
  );
}
