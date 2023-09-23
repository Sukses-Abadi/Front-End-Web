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

  const productColor = productDetails.map((element) => {
    return element.color;
  });
  const arrayColor = productColor;
  const uniqueColor = [...new Set(arrayColor)];

  const productSize = productDetails.map((element) => {
    return element.size;
  });
  const arraySize = productSize;
  const uniqueSize = [...new Set(arraySize)];

  return (
    <>
      {/* Start Card */}
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
        {/* Start Carousel  */}
        <div className="container mx-auto p-3">
          <div className="max-h-[17rem] carousel carousel-vertical">
            <Link href={`/product/${product.slug}`}>
              {productGallery.map((element) => (
                <div key={element.id} className="carousel-item h-auto">
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
          <div className="space-y-1.5">
            <h1 className="text-sm font-normal text-primary opacity-60">
              {product.Category.name}
            </h1>
            <Link href={`/product/${product.slug}`}>
              <h5 className="text-xl font-semibold tracking-tight text-primary">
                {product.name}
              </h5>
            </Link>

            <h1 className="text-sm font-normal text-primary opacity-70">
              Color:{" "}
              <div className="flex flex-inline">
                {" "}
                {uniqueColor.map((color) => (
                  <div
                    key={color}
                    className={`h-4 w-4 border-2 border-gray-700 rounded-full m-1 focus:outline-none`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </h1>

            <h1 className="text-sm font-normal text-primary opacity-70">
              Size: {uniqueSize.join(" ")}
            </h1>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <span className="text-lg font-semibold font-sans text-secondary">
              {convertToRupiah(cheapestPrice)}
            </span>
          </div>
        </div>
      </div>
      {/* End Card */}
    </>
  );
}
