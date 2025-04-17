import { prisma } from "@/prisma/client";

export const BUSINESS_QUERIES = {
  getById: async (userId) => {
    return prisma.business.findUnique({
      where: { userId },
      include: {
        // grab each product’s reviews + sales
        products: {
          include: {
            reviews: true,
            orderItems: {
              include: { order: true },
            },
          },
        },
        supportRequests: true,
      },
    });
  },
  updateBusiness: async (id, name, description) => {
    await prisma.business.update({
      where: { id },
      data: { businessName: name, businessDescription: description },
    });
  },
  getOrdersForBusiness: async (businessId) => {
    // 1) load every product + its orderItems + the parent order + buyer
    const biz = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        products: {
          include: {
            orderItems: {
              include: {
                order: { include: { buyer: true } },
              },
            },
          },
        },
      },
    });
    if (!biz) return [];

    // 2) flatten out one array of order‑records
    return biz.products.flatMap((p) =>
      p.orderItems.map((oi) => ({
        id: oi.order.id,
        orderDate: oi.order.orderDate,
        buyerName: oi.order.buyer.name,
        total: oi.order.amount.toString(),
        productName: p.name,
        quantity: oi.quantity,
      }))
    );
  },
};

export const USER_QUERIES = {
  getByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  getById: (id) => prisma.user.findUnique({ where: { id } }),
  getByUsername: (username) => prisma.user.findUnique({ where: { username } }),
  getByEmailOrUsername: (email, username) => {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  },
  getAllUsers: () => prisma.user.findMany(),
  getUserOrders: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            orderItems: {
              include: { product: true },
            },
          },
        },
      },
    });
  },
  getReviews: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        reviews: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  getSupportRequests: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        supportRequests: true,
      },
    });
  }
};

export const USER_MUTATIONS = {
  createUser: (data) => prisma.user.create({ data }),
  updateUser: (id, data) => prisma.user.update({ where: { id }, data }),
  deleteUser: (id) => prisma.user.delete({ where: { id } }),
};

export const PRODUCT_QUERIES = {
  getById: (id) => prisma.product.findUnique({ where: { id } }),
  getAllProducts: () => prisma.product.findMany(),
  getProductsByCategory: (categoryId) => {
    return prisma.product.findMany({
      where: { categoryId },
    });
  },
  getProductsBySeller: (sellerId) => {
    return prisma.product.findMany({
      where: { sellerId },
    });
  },
  getProductsByRating: (rating) => {
    return prisma.product.findMany({
      where: { rating },
    });
  },
  getProductsByPriceRange: (minPrice, maxPrice) => {
    return prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  },
  getProductsBySearch: (searchTerm) => {
    return prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });
  },
  getFeaturedProducts: async (limit = 10) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // fetch reviews so we can calc avg rating
    const products = await prisma.product.findMany({
      where: {
        orderItems: { some: { order: { orderDate: { gte: thirtyDaysAgo } } } },
      },
      orderBy: { orderItems: { _count: "desc" } },
      take: limit,
      include: {
        reviews: { select: { rating: true } },
        seller: { select: { name: true } },
      },
    });

    // compute avgRating and count
    return products.map((p) => {
      const count = p.reviews.length;
      const avg =
        count > 0 ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
      return {
        ...p,
        seller: p.seller.name,
        avgRating: avg,
        reviewsCount: count,
      };
    });
  },

  getProductDetailsWithReviews: async (id) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: { select: { name: true } },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            reviewer: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return null;
    }

    const count = product.reviews.length;
    const avg =
      count > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / count
        : 0;

    return {
      ...product,
      sellerName: product.seller.name,
      avgRating: avg,
      reviewsCount: count,
    };
  },
  getAllProductsWithReviews: async (selectedCategory, searchTerm) => {
    console.log("Fetching all products with reviews...");
    return await prisma.product.findMany({
      where: {
        ...(selectedCategory !== "all" ? { category: selectedCategory } : {}),
        AND: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: { select: { rating: true } },
        seller: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
