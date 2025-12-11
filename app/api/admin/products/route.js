import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const products = await prisma.product.findMany({
      include: {
        orderItems: {
          select: {
            quantity: true,
            price: true
          }
        },
        rating: {
          select: {
            rating: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const productsWithStats = products.map(product => ({
      ...product,
      totalSales: product.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      totalRevenue: product.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      averageRating: product.rating.length > 0 
        ? product.rating.reduce((sum, r) => sum + r.rating, 0) / product.rating.length 
        : 0,
      reviewCount: product.rating.length
    }))

    return NextResponse.json({ products: productsWithStats })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const productData = await request.json()

    // Create product with Du Daddy store (assuming single store)
    const product = await prisma.product.create({
      data: {
        ...productData,
        storeId: 'dudaddy-store' // Default store ID for single vendor
      }
    })

    return NextResponse.json({ 
      success: true, 
      product,
      message: 'Product created successfully' 
    })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}