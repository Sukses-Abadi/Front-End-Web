import Link from "next/link";

export default function Container({ children }) {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center py-2 md:py-4 flex-wrap">
        <Link
          href="/"
          className="text-primary text-base font-bold px-5 py-2.5 text-center mr-3 mb-3"
        >
          All categories
        </Link>
        <Link
          href="/"
          className="text-primary text-base font-normal px-5 py-2.5 text-center mr-3 mb-3"
        >
          Top
        </Link>
        <Link
          href="/"
          className="text-primary text-base font-normal px-5 py-2.5 text-center mr-3 mb-3"
        >
          Bottom
        </Link>
        <Link
          href="/"
          className="text-primary text-base font-normal px-5 py-2.5 text-center mr-3 mb-3"
        >
          Outwear
        </Link>
      </div>
      <div className="text-primary grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-3">
        {children}
      </div>
      <div className="flex items-center justify-center pt-16">
        <button className="btn btn-outline btn-primary">
          See More Products
        </button>
      </div>
    </div>
  );
}
