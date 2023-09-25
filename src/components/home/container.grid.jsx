import Link from "next/link";

export default function Container({ children }) {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center py-2 md:py-4 ">
        <header className="text-primary text-3xl font-bold px-5 py-2.5 text-center mr-3 mb-3">
          Our Products
        </header>
      </div>
      <div className="text-primary grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-3 max-[440px]:grid-cols-1 max-[440px]:px-2">
        {children}
      </div>
    </div>
  );
}
