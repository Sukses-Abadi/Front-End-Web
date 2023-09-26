import Card from "@/components/home/card";
import Container from "@/components/home/container.grid";
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
  const products = data.products;
  return (
    <Container>
      {products ? (
        products.map((product) => {
          return <Card key={product.id} product={product} />;
        })
      ) : (
        <h1> No Products are Found</h1>
      )}
    </Container>
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
