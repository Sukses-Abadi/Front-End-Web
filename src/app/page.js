import Card from "@/components/home/card";
import Carousel from "@/components/home/carousel";
import Container from "@/components/home/container.grid";
import fetchData from "@/fetch";

export default async function Home() {
  async function fetchProduct() {
    const { data } = await fetchData("api/products?limit=8", "GET", {
      cache: "no-store",
    });

    return data.products;
  }

  const products = await fetchProduct();
  // console.log(products);

  return (
    <>
      <Carousel />
      <Container>
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </Container>
      <h2 className=" bg-base-100 text-6xl">HOMEPAGE!</h2>
    </>
  );
}
