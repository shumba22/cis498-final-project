import { PRODUCT_QUERIES } from "@/lib/db/actions";
import ProductCard from "./product-card";

export default async function FeaturedProducts() {
  const rawProducts = await PRODUCT_QUERIES.getFeaturedProducts(4);

  const products = rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price.toString(), // Decimal → string (or p.price.toNumber())
    category: p.category,
    url: p.url,
    avgRating: p.avgRating,
    reviewsCount: p.reviewsCount,
    seller: p.seller, // already a string
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} tool={product} />
      ))}
    </div>
  );
}
