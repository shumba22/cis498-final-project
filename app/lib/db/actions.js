import { prisma } from "../../prisma/client";

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
      orderBy: { orderItems: { _count: 'desc' } },
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
        count > 0
          ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / count
          : 0;
      return {
        ...p,
        seller: p.seller.name,
        avgRating: avg,
        reviewsCount: count,
      };
    });
  },

  getProductDetailsWithReviews : async (id) => {
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
          orderBy: { createdAt: 'desc' },
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
  }
};