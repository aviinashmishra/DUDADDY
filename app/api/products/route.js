import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
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
