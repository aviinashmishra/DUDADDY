import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  try {
    console.log('Test Profile API: Starting')
    
    // Test session
    const session = await getServerSession(authOptions)
    console.log('Test Profile API: Session exists:', !!session)
    console.log('Test Profile API: User email:', session?.user?.email)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        error: 'No session',
        session: !!session,
        email: session?.user?.email
      }, { status: 401 })
    }

    // Test Prisma import
    try {
      const { prisma } = await import('@/lib/prisma')
      console.log('Test Profile API: Prisma imported:', !!prisma)
      
      if (!prisma) {
        return NextResponse.json({
          error: 'Prisma client is null',
          hasSession: true,
          email: session.user.email
        }, { status: 500 })
      }

      // Test basic user query
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      console.log('Test Profile API: User found:', !!user)

      return NextResponse.json({
        success: true,
        hasSession: true,
        email: session.user.email,
        userFound: !!user,
        userId: user?.id
      })

    } catch (prismaError) {
      console.error('Test Profile API: Prisma error:', prismaError)
      return NextResponse.json({
        error: 'Prisma error',
        details: prismaError.message,
        hasSession: true,
        email: session.user.email
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Test Profile API: General error:', error)
    return NextResponse.json({
      error: 'General error',
      details: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}