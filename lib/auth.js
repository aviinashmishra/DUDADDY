import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getCurrentUser() {
  try {
    // Check if we're in build environment (only during actual build, not dev)
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
      return null
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return null
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('./prisma')
    
    if (!prisma) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        store: true,
      },
    })

    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function generateUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
