import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user already has a store
    if (user.store) {
      return NextResponse.json(
        { error: 'You already have a store' },
        { status: 400 }
      )
    }

    const data = await request.json()
    const { name, username, email, contact, logo, description, address } = data

    // Validate required fields
    if (!name || !username || !email || !contact || !description || !address) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if username is already taken
    const existingStore = await prisma.store.findUnique({
      where: { username },
    })

    if (existingStore) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 400 }
      )
    }

    // Create store
    const store = await prisma.store.create({
      data: {
        userId: user.id,
        name,
        username,
        email,
        contact,
        logo: logo || `https://ui-avatars.com/api/?name=${name}&background=random`,
        description,
        address,
        status: 'pending',
        isActive: false,
      },
    })

    return NextResponse.json({
      success: true,
      store,
      message: 'Store created successfully. Waiting for admin approval.',
    })
  } catch (error) {
    console.error('Create store error:', error)
    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    )
  }
}
