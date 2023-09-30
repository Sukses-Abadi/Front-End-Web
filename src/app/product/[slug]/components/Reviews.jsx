import Image from "next/image";
import React from "react";

export default function Reviews({ data }) {
  return (
    <div className="m-10 ">
      <div>Review</div>
      <div className="divider"></div>
      <div class="flex flex-col gap-3 mt-8">
        {data.reviews.map((review) => {
          const name = review.user.first_name;
          const userPhoto = review.user.photo;
          const date = review.created_at;
          const rating = review.rating;
          const reviewImage = review.image;
          const image = `http:localhost:5000/${review.image}`;
          const text = review.review_text;
          const year = date.split("-")[0];
          function getMonthName(month) {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index

            if (monthIndex >= 0 && monthIndex < monthNames.length) {
              return monthNames[monthIndex];
            } else {
              return "Invalid Month";
            }
          }
          const month = getMonthName(date.split("-")[1]);

          function StarRating({ rating }) {
            const starIcons = [];

            for (let i = 1; i <= 5; i++) {
              if (i <= rating) {
                starIcons.push(
                  <ion-icon key={i} name="star">
                    ⭐
                  </ion-icon>
                );
              } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                starIcons.push(<ion-icon key={i} name="star-half"></ion-icon>);
              } else {
                starIcons.push(
                  <ion-icon key={i} name="star-outline"></ion-icon>
                );
              }
            }

            return <div>{starIcons}</div>;
          }
          return (
            <div key={review.id} class="flex flex-col gap-4 p-4">
              {/* <!-- Profile and Rating --> */}

              <div class="flex justify justify-between">
                {/* user photo and name */}
                <div class="flex gap-2">
                  <div class="  text-center rounded-full">
                    <Image
                      alt=""
                      src={
                        !userPhoto
                          ? "https:cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          : userPhoto
                      }
                      width={28}
                      height={28}
                    />
                  </div>
                  <span>{name}</span>
                </div>
                {/* rating */}
                <div class="flex p-1 gap-1 text-orange-300">
                  {StarRating({ rating })}
                  <div>Rating:{rating}</div>
                </div>
              </div>
              {reviewImage ? (
                <Image alt="" src={image} width={150} height={150} />
              ) : null}

              <div>{text}</div>

              <div class="flex justify-between">
                <span>
                  {month}, {year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
