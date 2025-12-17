import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Profile API: Starting request')
    const session = await getServerSession(authOptions)
    console.log('Profile API: Session:', session?.user?.email)
    
    if (!session?.user?.email) {
      console.log('Profile API: No session or email')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Profile API: Attempting to fetch user from database')
    // Get user with profile and preferences
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        preferences: true,
      },
    })
    console.log('Profile API: User found:', !!user)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create default profile if it doesn't exist
    let profile = user.profile
    if (!profile) {
      profile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          firstName: user.name?.split(' ')[0] || '',
          lastName: user.name?.split(' ').slice(1).join(' ') || '',
        },
      })
    }

    // Create default preferences if they don't exist
    let preferences = user.preferences
    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: {
          userId: user.id,
        },
      })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile,
      preferences,
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        error: 'Failed to fetch profile',
        details: error.message,
        type: error.name
      },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { profile: profileData, preferences: preferencesData } = body

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

    // Validate profile data
    if (profileData) {
      const { firstName, lastName, phone, dateOfBirth, bio } = profileData

      // Basic validation
      if (firstName && (typeof firstName !== 'string' || firstName.trim().length === 0)) {
        return NextResponse.json(
          { error: 'First name must be a non-empty string' },
          { status: 400 }
        )
      }

      if (lastName && typeof lastName !== 'string') {
        return NextResponse.json(
          { error: 'Last name must be a string' },
          { status: 400 }
        )
      }

      if (phone && (typeof phone !== 'string' || !/^\+?[\d\s\-\(\)]+$/.test(phone))) {
        return NextResponse.json(
          { error: 'Phone number format is invalid' },
          { status: 400 }
        )
      }

      if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
        return NextResponse.json(
          { error: 'Date of birth must be a valid date' },
          { status: 400 }
        )
      }

      if (bio && (typeof bio !== 'string' || bio.length > 500)) {
        return NextResponse.json(
          { error: 'Bio must be a string with maximum 500 characters' },
          { status: 400 }
        )
      }
    }

    // Update profile
    let updatedProfile = null
    if (profileData) {
      updatedProfile = await prisma.userProfile.upsert({
        where: { userId: user.id },
        update: {
          ...profileData,
          dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        },
        create: {
          userId: user.id,
          ...profileData,
          dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        },
      })
    }

    // Update preferences
    let updatedPreferences = null
    if (preferencesData) {
      updatedPreferences = await prisma.userPreferences.upsert({
        where: { userId: user.id },
        update: preferencesData,
        create: {
          userId: user.id,
          ...preferencesData,
        },
      })
    }

    // Update user name if profile name changed
    if (profileData?.firstName || profileData?.lastName) {
      const newName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim()
      if (newName && newName !== user.name) {
        await prisma.user.update({
          where: { id: user.id },
          data: { name: newName },
        })
      }
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile,
      preferences: updatedPreferences,
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}