// "use client";
import fetchData from "@/lib/fetch";
import React from "react";
import { Sizes } from "./Sizes";

export default async function DetailsComponent(product) {
  const productDetails = product.productDetails;
  const sizeS = await fetchData(`api/product_details/${product.id}/S`, {
    next: { revalidate: 10 },
  });
  const sizeM = await fetchData(`api/product_details/${product.id}/M`, {
    next: { revalidate: 10 },
  });
  const sizeL = await fetchData(`api/product_details/${product.id}/L`, {
    next: { revalidate: 10 },
  });
  const sizeXL = await fetchData(`api/product_details/${product.id}/XL`, {
    next: { revalidate: 10 },
  });
  const sizes = { S: sizeS, M: sizeM, L: sizeL, XL: sizeXL };

  return (
    <>
      <div className="mt-3">
        <Sizes sizes={sizes} discount={product.discount} />
      </div>
    </>
  );
}
