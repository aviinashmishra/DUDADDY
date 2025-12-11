import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request) {
  try {
    const user = await getCurrentUser()

    if (!user || !user.store) {
      return NextResponse.json(
        { error: 'Unauthorized or no store found' },
        { status: 401 }
      )
    }

    if (!user.store.isActive) {
      return NextResponse.json(
        { error: 'Your store is not active yet' },
        { status: 403 }
      )
    }

    const data = await request.json()
    const { name, description, mrp, price, images, category } = data

    if (!name || !description || !mrp || !price || !images || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        mrp: parseFloat(mrp),
        price: parseFloat(price),
        images,
        category,
        storeId: user.store.id,
      },
    })

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully',
    })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user || !user.store) {
      return NextResponse.json(
        { error: 'Unauthorized or no store found' },
        { status: 401 }
      )
    }

    const products = await prisma.product.findMany({
      where: { storeId: user.store.id },
      include: {
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
    console.error('Get store products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
