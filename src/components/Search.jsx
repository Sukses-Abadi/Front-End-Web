"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setSearchTerm("");
    router.push(`/${searchTerm}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between max-auto"
    >
      <div className="absolute max-w-max inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search icon</span>
      </div>

      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        value={searchTerm}
        id="search-navbar"
        className="block  w-full p-2 pl-10 text-sm rounded-md border border-primary"
        placeholder="Search..."
      />
      <button className=" hover:bg-primary  rounded-md border border-primary p-[6px] mr-4">
        🚀
      </button>
    </form>
  );
}
