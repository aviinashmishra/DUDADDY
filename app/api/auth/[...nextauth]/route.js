import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error('Email and OTP are required')
        }

        // Verify OTP
        const otpRecord = await prisma.oTP.findFirst({
          where: {
            email: credentials.email,
            otp: credentials.otp,
            verified: false,
            expiresAt: {
              gt: new Date(),
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        if (!otpRecord) {
          throw new Error('Invalid or expired OTP')
        }

        // Mark OTP as verified
        await prisma.oTP.update({
          where: { id: otpRecord.id },
          data: { verified: true },
        })

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          // Create new user
          const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          user = await prisma.user.create({
            data: {
              id: userId,
              email: credentials.email,
              name: credentials.email.split('@')[0],
              image: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=random`,
              emailVerified: new Date(),
            },
          })
        } else {
          // Update email verified
          user = await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          })
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
