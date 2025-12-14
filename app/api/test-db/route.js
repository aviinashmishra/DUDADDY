import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')
    
    if (!prisma) {
      return NextResponse.json(
        { error: 'Prisma client not available' },
        { status: 503 }
      )
    }

    // Test database connection
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Test a simple query
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error.message
      },
      { status: 500 }
    )
  }
}