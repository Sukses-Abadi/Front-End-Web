"use client";
import fetchWithToken from "@/lib/fetchWithToken";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

export default function FormReview({ order, productId }) {
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
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Your experience</label>
        <input
          type="text"
          name="review"
          className="input file-input-bordered"
        />
        <div className="space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={value}
                className="hidden"
                onChange={() => handleRating(value)}
              />
              <span className="text-3xl">&#9733;</span>
            </label>
          ))}
          {/* {rating && (
            <p className="mt-4">
              {rating === 5 ? "You're enjoy with our products!" :null }
            </p>
          )} */}
        </div>
        <label>Image</label>
        {filePreview && (
          <Image
            src={filePreview}
            alt="File Preview"
            className="max-w-xs mx-auto ml-10 h-32"
            width={500}
            height={500}
          />
        )}
        <input
          type="file"
          name="files"
          multiple
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-xs w-full max-w-xs text-xs md:text-md  self-center"
        />
        <button type="submit" className=" bg-blue-400 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
