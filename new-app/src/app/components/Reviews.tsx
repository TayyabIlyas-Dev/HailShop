"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useToast } from "../context/ToastContext";
import { client } from "../lib/sanityClient";

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
        <div className="mt-3 gap-3 animate-slide flex items-center justify-center">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border border-white/20 w-[320px] hover:shadow-lg bg-black hover:bg-[#000000d9] rounded-lg transition-transform hover:scale-[1.02] h-[230px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <p className="text-xs text-white">
                      {new Date(review._createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>
                        {i <= review.rating ? (
                          <AiFillStar className="text-yellow-400" />
                        ) : (
                          <AiOutlineStar className="text-gray-500" />
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Comment (Fixed Height with Scroll) */}
                  <p className="text-white mx-2 text-sm h-[60px] w-auto overflow-y-auto custom-review-scrollbar">
                    {review.comment}
                  </p>
                </div>

                {/* Delete Button - Always at the Bottom */}
                {user?.id === review.userId && (
                  <button
                    className="mt-4 w-full bg-white text-black px-3 py-2 border-2 border-black hover:border-white text-xs font-semibold transition hover:bg-black hover:text-white active:scale-95"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
