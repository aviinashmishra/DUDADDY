import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('profilePicture')

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed.' },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'profiles')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${user.id}_${timestamp}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)
    const publicPath = `/uploads/profiles/${fileName}`

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Update user profile with new picture
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { profilePicture: publicPath },
      create: {
        userId: user.id,
        profilePicture: publicPath,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
      },
    })

    // Also update the user's image field for consistency
    await prisma.user.update({
      where: { id: user.id },
      data: { image: publicPath },
    })

    return NextResponse.json({
      message: 'Profile picture uploaded successfully',
      profilePicture: publicPath,
      profile: updatedProfile,
    })

  } catch (error) {
    console.error('Profile picture upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload profile picture' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Remove profile picture
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { profilePicture: null },
      create: {
        userId: user.id,
        profilePicture: null,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
      },
    })

    // Generate a default avatar URL
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=random&size=200`

    // Update user's image field
    await prisma.user.update({
      where: { id: user.id },
      data: { image: defaultAvatar },
    })

    return NextResponse.json({
      message: 'Profile picture removed successfully',
      profilePicture: null,
      defaultAvatar,
      profile: updatedProfile,
    })

  } catch (error) {
    console.error('Profile picture removal error:', error)
    return NextResponse.json(
      { error: 'Failed to remove profile picture' },
      { status: 500 }
    )
  }
}