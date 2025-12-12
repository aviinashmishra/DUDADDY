import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

// Create Prisma client with proper error handling
let prisma

try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  } else {
    // Only set to null during actual build, not development
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
      prisma = null
    } else {
      // In development, still try to create client but handle errors gracefully
      prisma = globalForPrisma.prisma || new PrismaClient({
        log: ['error'],
      })
      if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    }
  }
} catch (error) {
  console.error('Prisma client initialization error:', error)
  prisma = null
}

export { prisma }
