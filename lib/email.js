import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your DuDaddy Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 20px;">
        <h2 style="color: #ef4444; font-size: 32px; margin-bottom: 10px;"><span style="color: #ef4444;">Du</span>Daddy</h2>
        <h3 style="color: #ffffff;">Verify Your Email</h3>
        <p style="color: #d1d5db;">Your verification code is:</p>
        <div style="background-color: #374151; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 8px; color: #ef4444;">
          ${otp}
        </div>
        <p style="color: #d1d5db;">This code will expire in 10 minutes.</p>
        <p style="color: #9ca3af;">If you didn't request this code, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #374151;">
        <p style="color: #6b7280; font-size: 12px;">DuDaddy - Premium Ayurvedic Supplements | Har Gym Ka Daddy</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to DuDaddy!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; padding: 20px;">
        <h2 style="color: #ef4444; font-size: 32px; margin-bottom: 10px;"><span style="color: #ef4444;">Du</span>Daddy</h2>
        <h3 style="color: #ffffff;">Welcome, ${name}!</h3>
        <p style="color: #d1d5db;">Thank you for joining DuDaddy - your trusted source for premium Ayurvedic supplements.</p>
        <p style="color: #d1d5db;">You can now:</p>
        <ul style="color: #d1d5db;">
          <li>Browse our 100% natural Ayurvedic supplement collection</li>
          <li>Track your orders in real-time</li>
          <li>Manage your account and preferences</li>
          <li>Access exclusive wellness content and tips</li>
        </ul>
        <p style="color: #d1d5db;">Start your wellness journey now with our premium Ayurvedic formulations!</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #374151;">
        <p style="color: #6b7280; font-size: 12px;">DuDaddy - Premium Ayurvedic Supplements | Har Gym Ka Daddy</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}
