"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

export default function FormReview({ order, productId, productDetails }) {
  const [rating, setRating] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState("");
  const router = useRouter();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
    // Generate a preview for the selected file
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target.result);
    };

    reader.readAsDataURL(files[0]); // Display preview for the first file
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    const user_id = order.user_id;
    const review_text = e.target.review.value;
    const rating = e.target.rating.value;

    try {
      const data = await fetchWithToken(
        "api/uploads",
        getCookie("accessToken"),
        { method: "POST", body: formData }
      );
      if (data.length > 0) {
        data.map(async (file) => {
          const body = {
            user_id: +user_id,
            review_text: review_text,
            rating: +rating,
            image: file.photo,
          };
          const res = await fetchWithToken(
            `api/review/product/${productId}`,
            getCookie("accessToken"),
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            }
          );
          toast.success(`${res.message}`);
          router.push("/");
        });
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="w-full p-5 lg:w-1/2 bg-white lg:relative"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Review {productDetails.product.name}
        </h1>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Share Your Thoughts
          </label>
          <input
            type="text"
            name="review"
            required
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
        </div>
        <div className="rating space-x-2 mt-4 block">
          <label className="flex text-gray-700 text-sm font-bold mb-2">
            {productDetails.product.name} Rating's
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  required
                  className={`mask mask-star-2 ${
                    value <= rating ? "bg-orange-400" : "bg-orange-900"
                  }`}
                  onChange={() => handleRating(value)}
                />
              </label>
            ))}
            {rating && (
              <p className="text-gray-600 ml-5">
                {rating === 1
                  ? "Disappointed"
                  : null || rating === 2
                  ? "Not worth it"
                  : null || rating === 3
                  ? "Okay"
                  : null || rating === 4
                  ? "Amazing"
                  : null || rating === 5
                  ? "Perfect"
                  : null}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Photo
          </label>
          {filePreview && (
            <Image
              src={filePreview}
              alt="File Preview"
              className="max-w-xs mx-auto ml-10 h-32"
              width={100}
              height={100}
            />
          )}
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-xs w-full max-w-xs text-xs md:text-md  self-center"
          />
        </div>
        <div className="flex pt-3 ">
          <button
            type="submit"
            className="btn btn-neutral btn-sm ml-auto lg:absolute lg:bottom-9 lg:right-3"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
