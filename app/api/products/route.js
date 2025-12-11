import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // Check if we're in build environment
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not available during build' },
        { status: 503 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const storeId = searchParams.get('storeId')
    const search = searchParams.get('search')

    const where = {
      inStock: true,
      ...(category && { category }),
      ...(storeId && { storeId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        store: {
          select: {
            name: true,
            username: true,
            logo: true,
          },
        },
        rating: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
