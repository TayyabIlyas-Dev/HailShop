"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useToast } from "../context/ToastContext";
import { client } from "../lib/sanityClient";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Reviews = () => {
  const { user } = useUser();
  const { slug } = useParams();

  interface Review {
    _id: string;
    productId: string;
    name: string;
    userId: string;
    rating: number;
    comment: string;
    _createdAt: string; // ✅ Date added
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [error, setError] = useState("");
  // const [showForm, setShowForm] = useState(true); // 👈 Form ko control karne ke liye state
  const { showToast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?productId=${slug}`);
        const data = await res.json();
        setReviews(data.reviews.reverse()); // 👈 Newest review last mein dikhane ke liye
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [slug]);

  // ✅ Add review to API
  const addReview = async () => {
    try {
      const reviewData = {
        productId: slug,
        name: user?.fullName || "Anonymous",
        userId: user?.id,
        rating: newReview.rating,
        comment: newReview.comment,
      };

      console.log("Sending Review Data:", reviewData); // ✅ Check Request Body

      const res = await fetch("/api/reviews", {
        // ✅ Fixed API Route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      console.log("API Response:", data); // ✅ Check API Response

      if (res.ok) {
        setReviews([data.review, ...reviews]);
        setNewReview({ rating: 0, comment: "" });
        // setShowForm(false);
        showToast("Review added successfully!");
      } else {
        setError(data.error || "Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // ✅ Fetch reviews from Sanity
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review" && productId == $slug] | order(_createdAt desc)`;
        const params = { slug };
        const data = await client.fetch(query, params);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [slug]);
  const deleteReview = async (reviewId: string) => {
    if (!user) return alert("Sign in to delete a review!");

    try {
      const res = await fetch("/api/deleteReview", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, userId: user.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        showToast("Review deleted!");
      } else {
        alert(data.error || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const getSlidesToShow = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };
  const [slideWidth, setSlideWidth] = useState(100 / getSlidesToShow());

  useEffect(() => {
    const handleResize = () => setSlideWidth(100 / getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  };

  return (
    <>
      <div className="w-full mx-auto p-6 bg-gray-100 backdrop-blur-md rounded-lg shadow-sm">
        <div className="bg-[#f5f5f5] dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-4 text-black">
            Add Review
          </h2>

          {/* ✅ Review Form (Hide after submission) */}
          {user && (
            <div className="flex flex-col gap-4 p-4  rounded-lg">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onClick={() => setNewReview({ ...newReview, rating: i })}
                    className="cursor-pointer text-xl"
                  >
                    {i <= newReview.rating ? (
                      <AiFillStar className="text-yellow-400" />
                    ) : (
                      <AiOutlineStar className="text-gray-400" />
                    )}
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="p-2 border rounded-md text-black"
                placeholder="Write a review..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
              <button
                className="bg-black text-white p-2 font-semibold transition hover:bg-white hover:text-black border-black border-2 active:scale-95"
                onClick={addReview}
              >
                Add Review
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-center text-2xl font-bold mt-12 text-black mb-5">
            Customer Reviews
          </h2>
        </div>
        {/* ✅ Review List */}
      </div>
      <div className="h-[300px] bg-gray-100 relative overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full p-4 bg-gray-100 rounded-lg">
          <div
            className="flex gap-3 flex-row transition-transform ease-out px-12 duration-500"
            style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review._id}
                className="w-[300px] p-4 rounded-xl border border-white/20 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] h-[180px] flex flex-col justify-between"
              >
                <div className="p-2 flex flex-col h-[200px]">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(review._createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>
                        {i <= review.rating ? (
                          <AiFillStar className="text-yellow-400" />
                        ) : (
                          <AiOutlineStar className="text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-white mx-2 text-sm h-[60px] w-auto overflow-y-auto custom-review-scrollbar">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <>
              <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                <div className="sm:w-24 h-full bg-gradient-to-r from-white opacity-95"></div>
                <div className="sm:w-28 h-full bg-gradient-to-l from-white opacity-95"></div>
              </div>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 border-2 border-black opacity-80 z-10"
                onClick={prevSlide}
              >
                <AiOutlineLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-opacity duration-300 border-2 border-black opacity-80 z-10"
                onClick={nextSlide}
              >
                <AiOutlineRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  
    </>
  );
};

export default Reviews;

      // <div className="h-[300px] bg-gray-100 relative overflow-hidden">
      //   <div className="relative w-full overflow-hidden">
      //     <div className="relative w-full p-4 bg-gray-100 rounded-lg">
      //       <div
      //             className="sm:min-w-[100%] md:min-w-[50%] lg:min-w-[33%] w-[300px] p-4 rounded-xl border border-white/20 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] h-[180px] flex flex-col justify-between"

      //         // className="flex gap-3 flex-row transition-transform ease-out px-12 duration-500"
      //         style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      //       >
      //         {reviewList.map((review) => (
      //           <div
      //             key={review._id}
      //              className=" w-[300px] p-4 rounded-xl border border-white/20 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] h-[180px] flex flex-col justify-between"

      //             // className="   min-w-[33%] p-2 transition-all duration-700 ease-out shadow-md  w-[300px] hover:shadow-lg bg-black hover:bg-[#696565de] rounded-lg  hover:scale-[1.02] h-[180px] flex flex-col justify-between"
      //           >
      //             <div className=" p-2 flex flex-col h-[200px]">
      //               <div className="flex justify-between items-center mb-2">
      //                 <h4 className="text-white font-bold">{review.name}</h4>
      //                 <p className="text-xs text-gray-500">
      //                   {new Date(review._createdAt).toLocaleDateString()}
      //                 </p>
      //               </div>

      //               <div className="flex gap-1 mb-2">
      //                 {[1, 2, 3, 4, 5].map((i) => (
      //                   <span key={i}>
      //                     {i <= review.rating ? (
      //                       <AiFillStar className="text-yellow-400" />
      //                     ) : (
      //                       <AiOutlineStar className="text-gray-300" />
      //                     )}
      //                   </span>
      //                 ))}
      //               </div>

      //               <p className="text-white mx-2 text-sm h-[60px] w-auto overflow-y-auto custom-review-scrollbar">
      //                 {review.comment}
      //               </p>
      //             </div>
      //           </div>
      //         ))}
      //       </div>
      //       {/* {reviewList.length > 1 && (
      //           <>
      //             <button
      //               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-opacity duration-300 hover:opacity-100 opacity-50"
      //               onClick={prevSlide}
      //             >
      //               <AiOutlineLeft size={24} />
      //             </button>
      //             <button
      //               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-opacity duration-300 hover:opacity-100 opacity-50"
      //               onClick={nextSlide}
      //             >
      //               <AiOutlineRight size={24} />
      //             </button>
      //           </>
      //         )} */}
      //       {reviewList.length > 1 && (
      //         <>
      //           <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
      //           <div className="sm:w-24 h-full bg-gradient-to-r from-white opacity-95"></div>
      //           <div className="sm:w-28 h-full bg-gradient-to-l from-white opacity-95"></div>
      //           </div>

      //           <button
      //             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 border-2 border-black opacity-80 z-10"
      //             onClick={prevSlide}
      //           >
      //             <AiOutlineLeft size={24} />
      //           </button>
      //           <button
      //             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black transition-opacity duration-300 border-2 border-black opacity-80 z-10"
      //             onClick={nextSlide}
      //           >
      //             <AiOutlineRight size={24} />
      //           </button>
      //         </>
      //       )}
      //     </div>
      //   </div>
      // </div>