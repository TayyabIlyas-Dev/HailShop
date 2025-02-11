"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Reviews = () => {
  const { user } = useUser();
  const { slug } = useParams();
  
  interface Review {
    id: string;
    productId: string;
    name: string;
    userId: string;
    rating: number;
    comment: string;
  }
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [error, setError] = useState("");

  // Fetch reviews from localStorage when component loads
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const filteredReviews = savedReviews.filter((r: any) => r.productId === slug);
    setReviews(filteredReviews);
  }, [slug]);

  // Add a new review
  const addReview = () => {
    if (!user) return alert("Sign in to add a review!");
    if (newReview.rating === 0 || newReview.comment.trim() === "") {
      setError("Select at least 1 star & enter a review.");
      return;
    }

    const review = {
      id: Date.now().toString(),
      productId: slug as string,
      name: user.fullName || "Anonymous",
      userId: user.id,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews)); // Update localStorage with new review
    setNewReview({ rating: 0, comment: "" });
    setError("");
  };

  // Delete a review
  const deleteReview = (id: string, userId: string) => {
    if (user?.id !== userId) return alert("You can only delete your own reviews!");
    const updatedReviews = reviews.filter((review: any) => review.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews)); // Update localStorage after deletion
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4 text-black">Customer Reviews</h2>

      {/* Review Form */}
      {user && (
        <div className="flex flex-col gap-4 p-4 bg-white/20 rounded-lg">
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
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
          <button
            className="bg-black text-white p-2 rounded-md transition hover:bg-gray-700 active:scale-95"
            onClick={addReview}
          >
            Add Review
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      {/* Review List */}
      <div className="mt-6">
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review.id} className="p-4 mb-3 border-3 border-red-300 bg-white/10 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-gray-800 font-bold">{review.name}</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>
                      {i <= review.rating ? (
                        <AiFillStar className="text-yellow-400" />
                      ) : (
                        <AiOutlineStar className="text-gray-400" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 mt-2">{review.comment}</p>
              {user?.id === review.userId && (
                <button
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md transition hover:bg-red-600 active:scale-95"
                  onClick={() => deleteReview(review.id, review.userId)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
