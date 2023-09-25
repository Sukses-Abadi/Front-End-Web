import Card from "@/components/home/card";
import Container from "@/components/home/container.grid";
import fetchData from "@/fetch";

export async function generateMetadata({ params: { searchTerm } }) {
  const displayTerm = searchTerm.replaceAll("%20", " ");
  const { data } = await fetchData(`api/products?q=${displayTerm}`, "GET", {
    next: { revalidate: 30 },
  });

  if (data?.error) {
    return {
      title: `${displayTerm} not Found`,
    };
  }
  return {
    title: `Search result for${displayTerm}`,
    description: `Search result for ${displayTerm}`,
  };
}

export default async function SearchResults({ params: { searchTerm } }) {
  const displayTerm = searchTerm.replaceAll("%20", " ");
  const { data } = await fetchData(`api/products?q=${displayTerm}`, "GET", {
    next: { revalidate: 30 },
  });
  const products = data.products;
  const content = (
    <Container>
      {products ? (
        products.map((product) => {
          return <Card key={product.id} product={product} />;
        })
      ) : (
        <h1> {searchTerm} not Found</h1>
      )}
    </Container>
  );
  return content;
}
