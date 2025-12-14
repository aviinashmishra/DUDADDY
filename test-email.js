// Quick test script to verify email configuration
// Run with: node test-email.js

require('dotenv').config()
const nodemailer = require('nodemailer')

async function testEmail() {
  console.log('Testing email configuration...\n')
  
  console.log('Configuration:')
  console.log('- Host:', process.env.EMAIL_SERVER_HOST)
  console.log('- Port:', process.env.EMAIL_SERVER_PORT)
  console.log('- User:', process.env.EMAIL_SERVER_USER)
  console.log('- Password:', process.env.EMAIL_SERVER_PASSWORD ? '✓ Set' : '✗ Not set')
  console.log()

  if (!process.env.EMAIL_SERVER_PASSWORD || process.env.EMAIL_SERVER_PASSWORD === 'your-gmail-app-password-here') {
    console.error('❌ Email password not configured!')
    console.log('Please update EMAIL_SERVER_PASSWORD in .env file')
    process.exit(1)
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  try {
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection successful!\n')

    console.log('Sending test email...')
    const testOTP = '123456'
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: 'DuDaddy - Email Test Successful',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">✅ Email Configuration Test</h2>
          <p>Your DuDaddy email system is working correctly!</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${testOTP}
          </div>
          <p>This is a test OTP code. Your authentication system is ready to use.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">DuDaddy - Premium Ayurvedic Supplements</p>
        </div>
      `,
    })

    console.log('✅ Test email sent successfully!')
    console.log(`📧 Check your inbox at: ${process.env.EMAIL_SERVER_USER}`)
    console.log('\n🎉 Email system is fully configured and working!')
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message)
    console.log('\nTroubleshooting:')
    console.log('1. Verify Gmail App Password is correct')
    console.log('2. Ensure 2FA is enabled on your Google account')
    console.log('3. Check if "Less secure app access" is not blocking')
    console.log('4. Try generating a new App Password')
    process.exit(1)
  }
}

testEmail()
