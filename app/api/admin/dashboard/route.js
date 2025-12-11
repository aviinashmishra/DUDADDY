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

    // Get dashboard statistics
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'user' } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { isPaid: true }
      })
    ])

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        },
        orderItems: {
          include: {
            product: {
              select: { name: true }
            }
          }
        }
      }
    })

    // Get top products
    const topProducts = await prisma.product.findMany({
      take: 5,
      include: {
        orderItems: {
          select: {
            quantity: true,
            price: true
          }
        }
      }
    })

    const dashboardData = {
      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue: totalRevenue._sum.total || 0
      },
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        total: order.total,
        status: order.status,
        customer: order.user.name,
        createdAt: order.createdAt,
        items: order.orderItems.length
      })),
      topProducts: topProducts.map(product => ({
        id: product.id,
        name: product.name,
        sales: product.orderItems.reduce((sum, item) => sum + item.quantity, 0),
        revenue: product.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      }))
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}