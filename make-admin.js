// Script to make a user admin
// Usage: node make-admin.js your-email@gmail.com

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function makeAdmin() {
  const email = process.argv[2]

  if (!email) {
    console.error('❌ Please provide an email address')
    console.log('Usage: node make-admin.js your-email@gmail.com')
    process.exit(1)
  }

  try {
    console.log(`Looking for user with email: ${email}...`)
    
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.error(`❌ User not found with email: ${email}`)
      console.log('\nMake sure the user has signed in at least once.')
      process.exit(1)
    }

    if (user.role === 'admin') {
      console.log(`✅ User ${email} is already an admin!`)
      process.exit(0)
    }

    console.log(`Found user: ${user.name} (${user.email})`)
    console.log('Updating role to admin...')

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    })

    console.log(`✅ Success! ${updatedUser.name} is now an admin!`)
    console.log('\nYou can now access:')
    console.log('- Admin Panel: http://localhost:3000/admin')
    console.log('- Approve Stores: http://localhost:3000/admin/approve')
    console.log('- Manage Stores: http://localhost:3000/admin/stores')
    console.log('- Manage Coupons: http://localhost:3000/admin/coupons')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin()
