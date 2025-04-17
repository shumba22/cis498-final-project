// components/dashboard/reviews-tab.js
import { FiStar, FiEdit } from "react-icons/fi";

export default function ReviewsTab({ reviews }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FiStar
          key={i}
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't reviewed any products yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-100 pb-6">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-800">
                <a
                  href={`/products/${review.product.id}`}
                  className="hover:text-indigo-600 transition"
                >
                  {review.product.name}
                </a>
              </h3>
              <div className="flex items-center text-sm space-x-1 mt-1">
                {renderStars(review.rating)}
                <span className="ml-2 text-gray-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
            <a
              href={`/products/${review.product.id}/edit-review`}
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              <FiEdit className="inline-block" />
            </a>
          </div>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
