import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export async function POST(request) {
  try {
    console.log('Forgot password request received')
    
    // Check if we're in build environment (only during actual build, not dev)
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not available during build' },
        { status: 503 }
      )
    }

    const { email } = await request.json()
    console.log('Processing forgot password for email:', email ? 'provided' : 'missing')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Dynamic import to avoid build-time database connection
    console.log('Importing Prisma client...')
    const { prisma } = await import('@/lib/prisma')
    
    if (!prisma) {
      console.error('Prisma client not available')
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    console.log('Checking if user exists...')
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('User not found, returning generic message for security')
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, we have sent a password reset link.',
      })
    }

    console.log('User found, generating reset token...')
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    console.log('Saving reset token to database...')
    // Save reset token to database
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt,
      },
    })
    console.log('Reset token saved successfully')

    // Send reset email (with error handling)
    try {
      // Check if email configuration is available
      if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        console.warn('Email configuration missing, skipping email send')
        // Still return success for security (don't reveal if email config is missing)
        return NextResponse.json({
          message: 'If an account with that email exists, we have sent a password reset link.',
        })
      }

      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      })

      // Verify transporter configuration
      await transporter.verify()

      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
        to: email,
        subject: 'Password Reset Request - Du Daddy',
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #de2529; margin: 0;">Du Daddy</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
              <p style="color: #666; line-height: 1.6;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #de2529; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                If you didn't request this password reset, please ignore this email. This link will expire in 1 hour.
              </p>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #de2529; word-break: break-all;">${resetUrl}</a>
              </p>
            </div>
            
            <div style="text-align: center; color: #999; font-size: 12px;">
              <p>This email was sent by Du Daddy. If you have any questions, please contact our support team.</p>
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
      console.log('Password reset email sent successfully to:', email)
      
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      // Don't fail the request if email fails, for security reasons
      // The token is still created in the database
    }

    return NextResponse.json({
      message: 'If an account with that email exists, we have sent a password reset link.',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    console.error('Error stack:', error.stack)
    
    // Return more specific error information in development
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { 
          error: 'Internal server error',
          details: error.message,
          stack: error.stack
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}