import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { storeId, approve } = await request.json()

    if (!storeId) {
      return NextResponse.json(
        { error: 'Store ID is required' },
        { status: 400 }
      )
    }

    const store = await prisma.store.update({
      where: { id: storeId },
      data: {
        status: approve ? 'approved' : 'rejected',
        isActive: approve,
      },
    })

    return NextResponse.json({
      success: true,
      store,
      message: `Store ${approve ? 'approved' : 'rejected'} successfully`,
    })
  } catch (error) {
    console.error('Approve store error:', error)
    return NextResponse.json(
      { error: 'Failed to update store status' },
      { status: 500 }
    )
  }
}
