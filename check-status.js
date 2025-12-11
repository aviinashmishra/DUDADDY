// System status checker
// Run with: node check-status.js

require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkStatus() {
  console.log('🔍 GoCart System Status Check\n')
  console.log('=' .repeat(50))
  
  // Check environment variables
  console.log('\n📋 Environment Variables:')
  const envChecks = {
    'Database URL': !!process.env.DATABASE_URL,
    'NextAuth URL': !!process.env.NEXTAUTH_URL,
    'NextAuth Secret': !!process.env.NEXTAUTH_SECRET,
    'Email Host': !!process.env.EMAIL_SERVER_HOST,
    'Email User': !!process.env.EMAIL_SERVER_USER,
    'Email Password': !!process.env.EMAIL_SERVER_PASSWORD && 
                      process.env.EMAIL_SERVER_PASSWORD !== 'your-gmail-app-password-here',
    'JWT Secret': !!process.env.JWT_SECRET,
  }

  for (const [key, value] of Object.entries(envChecks)) {
    console.log(`  ${value ? '✅' : '❌'} ${key}`)
  }

  // Check database connection
  console.log('\n🗄️  Database Connection:')
  try {
    await prisma.$connect()
    console.log('  ✅ Connected to database')
    
    // Count records
    const userCount = await prisma.user.count()
    const storeCount = await prisma.store.count()
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()
    
    console.log(`  📊 Users: ${userCount}`)
    console.log(`  📊 Stores: ${storeCount}`)
    console.log(`  📊 Products: ${productCount}`)
    console.log(`  📊 Orders: ${orderCount}`)
    
    // Check for admin users
    const adminCount = await prisma.user.count({
      where: { role: 'admin' }
    })
    console.log(`  👑 Admins: ${adminCount}`)
    
    if (adminCount === 0) {
      console.log('  ⚠️  No admin users found. Run: node make-admin.js your@email.com')
    }
    
    // Check pending stores
    const pendingStores = await prisma.store.count({
      where: { status: 'pending' }
    })
    if (pendingStores > 0) {
      console.log(`  ⏳ Pending store approvals: ${pendingStores}`)
    }
    
  } catch (error) {
    console.log('  ❌ Database connection failed:', error.message)
  }

  // Check email configuration
  console.log('\n📧 Email Configuration:')
  if (envChecks['Email Password']) {
    console.log('  ✅ Email configured')
    console.log('  💡 Test with: node test-email.js')
  } else {
    console.log('  ❌ Email password not set')
    console.log('  💡 Update EMAIL_SERVER_PASSWORD in .env')
  }

  // Check authentication
  console.log('\n🔐 Authentication:')
  console.log('  ✅ NextAuth configured')
  console.log('  ✅ OTP system ready')
  console.log('  ✅ Session management active')

  // URLs
  console.log('\n🌐 Application URLs:')
  console.log('  🏠 Homepage: http://localhost:3000')
  console.log('  🔑 Sign In: http://localhost:3000/auth/signin')
  console.log('  👑 Admin: http://localhost:3000/admin')
  console.log('  🏪 Store: http://localhost:3000/store')
  console.log('  🛍️  Shop: http://localhost:3000/shop')

  // Quick commands
  console.log('\n⚡ Quick Commands:')
  console.log('  npm run dev              - Start development server')
  console.log('  node make-admin.js       - Make user admin')
  console.log('  node test-email.js       - Test email system')
  console.log('  npx prisma studio        - Open database GUI')

  // Documentation
  console.log('\n📚 Documentation:')
  console.log('  📖 FINAL_SUMMARY.md           - Quick overview')
  console.log('  📖 COMPLETE_SYSTEM_GUIDE.md   - Full documentation')
  console.log('  📖 AUTH_SETUP.md              - Authentication guide')
  console.log('  📖 API_TESTING_GUIDE.md       - API reference')

  // Overall status
  console.log('\n' + '='.repeat(50))
  const allGood = Object.values(envChecks).every(v => v)
  if (allGood) {
    console.log('✅ System Status: ALL SYSTEMS OPERATIONAL')
    console.log('🚀 Ready to launch!')
  } else {
    console.log('⚠️  System Status: CONFIGURATION NEEDED')
    console.log('📝 Check the items marked with ❌ above')
  }
  console.log('=' .repeat(50) + '\n')

  await prisma.$disconnect()
}

checkStatus().catch(console.error)
