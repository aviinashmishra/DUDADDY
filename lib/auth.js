import { prisma } from './prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
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
