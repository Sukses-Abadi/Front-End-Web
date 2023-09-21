import { Card } from "@/components/Card";
import { baseUrl } from "@/lib/constant";

import fetchData from "@/lib/fetch";
import Image from "next/image";
import { MoreProduct } from "./components/MoreProduct";
import DetailsComponent from "./components/DetailsComponent";

export async function generateMetadata(req) {
  const { slug } = req.params;

  const { data } = await fetchData(`api/products/${slug}`, "GET", {
    cache: "no-store",
  });

  return {
    title: `SA Apparel ${data?.name}`,
    description: `Collection of ${data.name} in SA. Apparel`,
  };
}
export default async function Page(req) {
  const { slug } = req.params;
  const { data } = await fetchData(`api/products/${slug}`, "GET", {
    cache: "no-store",
  });
  const photoGallery = data.productGalleries;
  return (
    <>
      <main className="my-8">
        <div className="container mx-auto px-6">
          {/* photo */}
          <div className="md:flex md:items-start">
            <div className="w-full md:w-1/2 mx-2">
              {photoGallery.map((element) => (
                <section key={element.id} className=" mb-10  ">
                  {" "}
                  <Image
                    className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                    src={`${baseUrl}/${element.photo}`}
                    alt={`${data.name}`}
                    width={500}
                    height={600}
                  />
                </section>
              ))}
            </div>
            {/* product details */}
            <div className="w-full  max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 sticky top-10 items-start">
              <h3 className="text-gray-700 uppercase text-lg">{data.name}</h3>
              <DetailsComponent {...data} />
            </div>
          </div>
          {/* description */}
          <div className=" h-screen my-10 ">
            Description: A detailed description of the product, including its
            purpose, design, and intended use.
            <br />
            Features: List of features or functionalities the product offers.
            <br />
            Technical Details: Information about the internal components,
            materials, and manufacturing processes used.
            <br />
            Dimensions and Weight: Measurements of the product is size and
            weight.
            <br />
            Performance: Information about how the product performs under
            different conditions.
            <br />
            Power Requirements: Details about the power source or battery life.
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const { data } = await fetchData(`api/products`, "GET", {
    cache: "no-store",
  });
  const productArray = data.products;
  return productArray.map((product) => ({
    slug: product.slug,
  }));
}
