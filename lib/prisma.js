import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

// Only create Prisma client if DATABASE_URL is available
let prisma

if (process.env.DATABASE_URL) {
  prisma = globalForPrisma.prisma || new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} else {
  // Mock prisma for build time
  prisma = null
}

export { prisma }
