"use client";
import Pagination from "@/components/Pagination";
import Card from "@/components/home/card";
import Carousel from "@/components/home/carousel";
import Container from "@/components/home/container.grid";
import fetchData from "@/fetch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchProduct() {
      const { data } = await fetchData(
        `api/products?limit=2&page=${page}`,
        "GET",
        {
          cache: "no-store",
        }
      );
      console.log(data);
      setData(data);
      setLoading(false);
      return data;
    }
    const data = fetchProduct();
  }, []);

  if (loading) return;
  if (!data) return;
  console.log(data);

  return (
    <>
      <Carousel />
      <div className="m-5"></div>
      <Container>
        {data.products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </Container>
      <div className=" w-screen mr-16 p-4">
        <Pagination className="mr-11" data={data} />
      </div>
    </>
  );
}
