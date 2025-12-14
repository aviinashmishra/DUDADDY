import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
      DATABASE_URL: !!process.env.DATABASE_URL,
    }

    // Test database connection
    let dbStatus = 'disconnected'
    try {
      const { prisma } = await import('@/lib/prisma')
      if (prisma) {
        await prisma.$connect()
        dbStatus = 'connected'
        await prisma.$disconnect()
      }
    } catch (error) {
      dbStatus = `error: ${error.message}`
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      database: dbStatus,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}