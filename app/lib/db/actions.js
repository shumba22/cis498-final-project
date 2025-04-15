import { prisma } from '../../prisma/client';

const USER_QUERIES = {
  getByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  getById: (id) => prisma.user.findUnique({ where: { id } }),
  getByUsername: (username) => prisma.user.findUnique({ where: { username } }),
  getByEmailOrUsername: (email, username) => {
    return prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });
  },
  getAllUsers: () => prisma.user.findMany(),
}

export default USER_QUERIES;