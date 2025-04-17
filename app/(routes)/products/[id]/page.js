import ProductDetails from "@/components/products/product-details";
import ReviewSection from "@/components/products/review-section";
import { PRODUCT_QUERIES } from "@/lib/db/actions";

export default async function ProductPage({ params }) {
  const { id } = params;
  const raw = await PRODUCT_QUERIES.getProductDetailsWithReviews(id);

  if (!raw) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  // strip out Decimal & Date objects before hydration
  const product = {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    price: raw.price.toNumber(), // Decimal → number
    category: raw.category,
    url: raw.url,
    status: raw.status,
    createdAt: raw.createdAt.toISOString(), // Date → string
    updatedAt: raw.updatedAt.toISOString(),
    seller: { name: raw.sellerName }, // nest back for ProductDetails
    avgRating: raw.avgRating,
    reviewsCount: raw.reviewsCount,
    reviews: raw.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      reviewer: { name: r.reviewer.name },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 bg-gray-50">
      {/* 1) Product Details */}
      <ProductDetails product={product} />

      {/* 2) Reviews */}
      <ReviewSection reviews={product.reviews} />
    </div>
  );
}
