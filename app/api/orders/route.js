import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request) {
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

    const data = await request.json()
    const { items, addressId, paymentMethod, couponCode } = data

    if (!items || items.length === 0 || !addressId || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')

    // Group items by store
    const itemsByStore = items.reduce((acc, item) => {
      if (!acc[item.storeId]) {
        acc[item.storeId] = []
      }
      acc[item.storeId].push(item)
      return acc
    }, {})

    const orders = []

    // Create an order for each store
    for (const [storeId, storeItems] of Object.entries(itemsByStore)) {
      const total = storeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          storeId,
          addressId,
          total,
          paymentMethod,
          isPaid: paymentMethod === 'STRIPE',
          orderItems: {
            create: storeItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
          address: true,
          store: true,
        },
      })

      orders.push(order)
    }

    return NextResponse.json({
      success: true,
      orders,
      message: 'Orders created successfully',
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
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

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        address: true,
        store: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
