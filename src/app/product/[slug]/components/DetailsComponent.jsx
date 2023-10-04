// "use client";
import fetchData from "@/lib/fetch";
import React from "react";
import { Sizes } from "./Sizes";

export default async function DetailsComponent(product) {
  const productDetails = product.productDetails;

  const productSize = productDetails.map((element) => {
    return element.size;
  });
  const uniqueSize = [...new Set(productSize)];
  const sizePromises = uniqueSize.map(async (size) => {
    const result = await fetchData(
      `api/product_details/${product.id}/${size}`,
      {
        next: { revalidate: 10 },
      }
    );
    return { [size]: result };
  });

  const sizesMap = await Promise.all(sizePromises);

  const uniqueSizeData = Object.assign({}, ...sizesMap);
  return (
    <>
      <div className="mt-3">
        <Sizes sizes={uniqueSizeData} discount={product.discount} />
      </div>
    </>
  );
}
