"use client";

import { FiStar as Star } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ProductCard({ key, tool }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${tool.id}`);
  };

  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log(`${tool.name} added to cart`);
  };

  return (
    <div
      key={tool.id}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <img
              src={tool.url}
              alt={tool.name}
              className="w-10 h-10 object-cover"
            />
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tool.category}
          </span>
        </div>
        <h3 className="text-lg text-gray-700 font-bold mb-2">{tool.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span>{tool.avgRating.toFixed(1)}</span>
          <span className="mx-2">•</span>
          <span>{tool.seller}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-700 font-bold">
            ${tool.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
