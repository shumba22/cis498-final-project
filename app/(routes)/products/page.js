import { prisma } from "@/prisma/client";
import ProductFilters from "@/components/products/product-filters";
import ProductCard from "@/components/products/product-card";

export default async function ProductsPage({ searchParams }) {
  const selectedCategory = (await searchParams.category) || "all";

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "plugins", name: "Plugins" },
    { id: "themes", name: "Themes" },
    { id: "extensions", name: "Extensions" },
    { id: "libraries", name: "Libraries" },
  ];

  // 3) fetch products, include reviews + seller for metrics
  const productsData = await prisma.product.findMany({
    where: selectedCategory !== "all" ? { category: selectedCategory } : {},
    include: {
      reviews: { select: { rating: true } },
      seller: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 4) compute avgRating, count & expose sellerName
  const products = productsData.map((p) => {
    const count = p.reviews.length;
    const avg = count
      ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / count
      : 0;
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      category: p.category,
      url: p.url,
      avgRating: avg,
      reviewsCount: count,
      seller: p.seller.name,
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {selectedCategory === "all" ? "All Tools" : selectedCategory}
        </h1>
        {/* client‐side filter UI */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
        />

        {/* product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {products.map((tool) => (
            <ProductCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
