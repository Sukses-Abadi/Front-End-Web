import Image from "next/image";
import Link from "next/link";

export default function Card(props) {
  const { product } = props;
  const productGallery = product.productGalleries;

  const productDetails = product.productDetails;
  const cheapestPrice = productDetails.reduce((minPrice, product) => {
    const price = product.price; // Assuming each product has a 'price' property
    return price < minPrice ? price : minPrice;
  }, Infinity);

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  return (
    <>
      {/* Start Card */}
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
        {/* Start Carousel  */}
        <div className="container mx-auto p-3">
          <div className="max-h-[17rem] carousel carousel-vertical">
            <Link href={`/product/${product.slug}`}>
              {productGallery.map((element) => (
                <div className="carousel-item h-auto">
                  <Image
                    className="object-contain object-center"
                    src={`http://localhost:5000/${element.photo}`}
                    alt="product image"
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </Link>
          </div>
        </div>

        {/* End Carousel */}
        <div className="px-5 pb-5">
          <h1 className="text-sm font-normal text-primary opacity-60">
            {product.Category.name}
          </h1>
          <a href="#">
            <h5 className="text-lg font-semibold tracking-tight text-primary">
              {product.name}
            </h5>
          </a>

          <div className="flex items-center justify-between">
            <span className="text-lg font-normal font-sans text-primary">
              {convertToRupiah(cheapestPrice)}
            </span>
            <a
              href="#"
              className="text-white bg-accent hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
      {/* End Card */}
    </>
  );
}
