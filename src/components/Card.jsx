import { baseUrl } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";

export function Card(product) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card w-96 bg-base-100 shadow-xl"
    >
      <div className="h-96 carousel carousel-vertical rounded-box">
        {product.productGalleries.map((element, index) => (
          <div key={element.id} className="carousel-item h-full">
            <Image
              src={`${baseUrl}/${element.photo}`}
              className="rounded-box"
              alt="product photo"
              width="500"
              height="500"
            />
          </div>
        ))}
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {/*badge  */}
          {/* <div className="badge badge-secondary">NEW</div>  */}
        </h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Add to Cart</button> */}
        </div>
      </div>
    </Link>
  );
}
