const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupAdmin() {
  try {
    console.log('Setting up Du Daddy admin user...')

    const adminEmail = 'dudaddyworld@gmail.com'
    const adminPassword = 'Dud@ddy01'
    
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email: adminEmail },
        data: {
          role: 'admin',
          name: 'Du Daddy Admin',
          emailVerified: new Date(),
          image: 'https://ui-avatars.com/api/?name=Du+Daddy+Admin&background=de2529&color=ffffff'
        }
      })
      console.log('✅ Updated existing user to admin:', updatedUser.email)
    } else {
      // Create new admin user
      const adminId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const newUser = await prisma.user.create({
        data: {
          id: adminId,
          email: adminEmail,
          name: 'Du Daddy Admin',
          role: 'admin',
          emailVerified: new Date(),
          image: 'https://ui-avatars.com/api/?name=Du+Daddy+Admin&background=de2529&color=ffffff',
          cart: {}
        }
      })
      console.log('✅ Created new admin user:', newUser.email)
    }

    // Create a permanent OTP for admin login (for development purposes)
    // In production, you should use proper authentication
    const adminOTP = '123456' // Fixed OTP for admin
    
    // Delete any existing OTPs for this email
    await prisma.oTP.deleteMany({
      where: { email: adminEmail }
    })

    // Create a long-lasting OTP for admin
    await prisma.oTP.create({
      data: {
        email: adminEmail,
        otp: adminOTP,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        verified: false
      }
    })

    console.log('✅ Admin credentials setup complete!')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password/OTP:', adminOTP)
    console.log('🚀 You can now login to the admin panel')
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupAdmin()