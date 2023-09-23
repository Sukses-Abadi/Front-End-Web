import Footer from "@/components/home/footer";
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
      <div className="m-5"></div>
      <Container>
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </Container>
      <Footer />
    </>
  );
}
