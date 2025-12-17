// Create Prisma client with proper error handling
let prisma = null

try {
  const { PrismaClient } = require('@prisma/client')
  
  const globalForPrisma = global

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
  console.error('This might be due to missing Prisma client generation. Run: npx prisma generate')
  prisma = null
}

export { prisma }
