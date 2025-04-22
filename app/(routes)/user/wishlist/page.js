// components/dashboard/wishlist-tab.js
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

// Note: Since there's no wishlist table in your schema yet,
// this is a placeholder component that you can implement later
export default function WishlistTab() {
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">Your wishlist is empty.</p>
      <p className="text-sm text-gray-500 mt-2">
        Save products you're interested in for later by adding them to your
        wishlist.
      </p>
      <a
        href="/products"
        className="inline-block mt-4 bg-[#FF4500] text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Browse Products
      </a>
    </div>
  );
}
