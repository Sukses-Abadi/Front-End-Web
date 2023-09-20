import { Card } from "@/components/Card";
import { baseUrl } from "@/lib/constant";
import fetchData from "@/lib/fetch";
import Image from "next/image";
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

  return (
    <>
      <div>
        {data?.productGalleries.map((element) => {
          return (
            <Image
              key={element.id}
              src={`${baseUrl}/${element.photo}`}
              className="rounded-box"
              alt="product photo"
              width="500"
              height="500"
            />
          );
        })}
      </div>
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
