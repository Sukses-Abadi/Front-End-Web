import { Card } from "@/components/Card";
import { baseUrl } from "@/lib/constant";

import fetchData from "@/lib/fetch";
import Image from "next/image";
import { MoreProduct } from "./components/MoreProduct";
import DetailsComponent from "./components/DetailsComponent";
import Link from "next/link";

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
        </div>
      </main>
      {/* description */}
      <div className=" container m-auto w-screen my-10 text-left font-mono text-lg">
        <p className="my-2 tracking-wider leading-8">
          <span className=" text-blue-400 italic font-serif lining-nums text-xl ">
            SKU : {data.SKU}
          </span>
          <br />
          {data.description}
          <br />
        </p>
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
