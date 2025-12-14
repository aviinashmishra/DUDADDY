// Generate secure secrets for environment variables
// Run with: node generate-secrets.js

const crypto = require('crypto')

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex')
}

console.log('🔐 DuDaddy Environment Secrets Generator\n')
console.log('Copy these values to your Vercel environment variables:\n')

console.log('NEXTAUTH_SECRET=' + generateSecret(32))
console.log('JWT_SECRET=' + generateSecret(24))

console.log('\n📝 Notes:')
console.log('- NEXTAUTH_SECRET: Used by NextAuth.js for JWT signing')
console.log('- JWT_SECRET: Used for OTP token generation')
console.log('- Keep these secrets secure and never commit them to version control')
console.log('- Generate new secrets for each environment (dev, staging, prod)')

console.log('\n🚀 Next Steps:')
console.log('1. Add these to your Vercel environment variables')
console.log('2. Set NEXTAUTH_URL to your Vercel app URL')
console.log('3. Configure Google OAuth with your production domain')
console.log('4. Deploy your application')