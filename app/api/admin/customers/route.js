import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

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

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Dynamic import to avoid build-time database connection
    const { prisma } = await import('@/lib/prisma')

    const customers = await prisma.user.findMany({
      where: { role: 'user' },
      include: {
        buyerOrders: {
          select: {
            total: true,
            createdAt: true,
            isPaid: true
          }
        },
        Address: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const customersWithStats = customers.map(customer => {
      const orders = customer.buyerOrders
      const totalSpent = orders
        .filter(order => order.isPaid)
        .reduce((sum, order) => sum + order.total, 0)
      
      return {
        ...customer,
        totalOrders: orders.length,
        totalSpent,
        averageOrderValue: orders.length > 0 ? totalSpent / orders.length : 0,
        lastOrderDate: orders.length > 0 ? orders[0].createdAt : null,
        addresses: customer.Address
      }
    })

    return NextResponse.json({ customers: customersWithStats })
  } catch (error) {
    console.error('Customers API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}