import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { search } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const results = await prisma.product.findMany({
      where: {
        name: {
          contains: search || '',
          mode: 'insensitive',
        },
      },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Search failed' });
  }
}
