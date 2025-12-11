import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request, { params }) {
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

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        store: true,
        rating: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    // Check if we're in build environment
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not available during build' },
        { status: 503 }
      )
    }

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.storeId !== user.store?.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const data = await request.json()

    const updatedProduct = await prisma.product.update({
      where: { id: params.productId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.mrp && { mrp: parseFloat(data.mrp) }),
        ...(data.price && { price: parseFloat(data.price) }),
        ...(data.images && { images: data.images }),
        ...(data.category && { category: data.category }),
        ...(data.inStock !== undefined && { inStock: data.inStock }),
      },
    })

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    // Check if we're in build environment
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not available during build' },
        { status: 503 }
      )
    }

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.storeId !== user.store?.id && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.product.delete({
      where: { id: params.productId },
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
