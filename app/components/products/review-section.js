'use client';

import { useState } from 'react';
import { FiStar as Star } from 'react-icons/fi';

export default function ReviewSection({ reviews }) {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>

      <div className="space-y-4">
        {list.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{r.reviewer.name}</span>
              <span className="text-sm text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-[#666666]">{r.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-indigo-600 hover:underline"
        >
          {showAll ? 'Show Less' : `Show All (${reviews.length})`}
        </button>
      )}
    </section>
  );
}