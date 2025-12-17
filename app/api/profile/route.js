import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

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

    // For now, return a basic profile structure without database access
    // This will allow the profile page to load while we fix the Prisma issue
    console.log('Profile API: Returning basic profile structure')
    
    const basicProfile = {
      user: {
        id: session.user.id || 'temp-id',
        name: session.user.name || 'User',
        email: session.user.email,
        image: session.user.image,
        emailVerified: null,
        role: session.user.role || 'user',
        createdAt: new Date().toISOString(),
      },
      profile: {
        id: 'temp-profile-id',
        userId: session.user.id || 'temp-id',
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
        phone: null,
        dateOfBirth: null,
        profilePicture: session.user.image,
        bio: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      preferences: {
        id: 'temp-preferences-id',
        userId: session.user.id || 'temp-id',
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        orderUpdates: true,
        promotionalOffers: true,
        dataSharing: false,
        twoFactorEnabled: false,
        language: 'en',
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }

    return NextResponse.json(basicProfile)



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

    // Basic validation
    if (profileData) {
      const { firstName, lastName, phone, dateOfBirth, bio } = profileData

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

    // For now, just return success without database update
    // This allows the profile editing to work while we fix the Prisma issue
    console.log('Profile update request received:', { profileData, preferencesData })

    return NextResponse.json({
      message: 'Profile updated successfully (temporary - database update pending)',
      profile: profileData ? {
        id: 'temp-profile-id',
        userId: session.user.id || 'temp-id',
        ...profileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } : null,
      preferences: preferencesData ? {
        id: 'temp-preferences-id',
        userId: session.user.id || 'temp-id',
        ...preferencesData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } : null,
    })

  } catch (error) {
    console.error('Profile update error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        error: 'Failed to update profile',
        details: error.message,
        type: error.name
      },
      { status: 500 }
    )
  }
}