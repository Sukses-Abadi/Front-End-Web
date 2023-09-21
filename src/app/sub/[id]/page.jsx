import { Card } from "@/components/Card";
import fetchData from "@/lib/fetch";

export async function generateMetadata(req) {
  const { id } = req.params;

  const { data } = await fetchData(`api/subcategory/${id}`, "GET", {
    cache: "no-store",
  });

  return {
    title: `SA Apparel ${data.name}`,
    description: `Collection of ${data.name} in SA. Apparel`,
  };
}
export default async function Page(req) {
  const { id } = req.params;
  const { data } = await fetchData(
    `api/products?sub_category_id=${id}`,
    "GET",
    {
      cache: "no-store",
    }
  );

  return (
    <div className="flex justify-center items-center">
      <section className="mx-auto flex flex-wrap flex-inline items-center justify-center">
        {data.products?.map((product, index) => {
          return <Card key={product.id} {...product} />;
        })}
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const { data } = await fetchData("api/subcategory", "GET", {
    cache: "no-store",
  });

  return data.map((product) => ({
    id: product.id.toString(),
  }));
}