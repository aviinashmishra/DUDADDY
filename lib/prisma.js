import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

// Create Prisma client with proper error handling
let prisma

try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  } else {
    console.warn('DATABASE_URL not found in environment variables')
    prisma = null
  }
} catch (error) {
  console.error('Prisma client initialization error:', error)
  prisma = null
}

export { prisma }
