import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check if we're in build environment
        if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
          throw new Error('Database not available during build')
        }

        if (!credentials?.email) {
          throw new Error('Email is required')
        }

        // Dynamic import to avoid build-time database connection
        const { prisma } = await import('@/lib/prisma')

        // Check if this is admin login with password
        if (credentials.email === 'dudaddyworld@gmail.com' && credentials.password) {
          if (credentials.password === 'Dud@ddy01') {
            // Find or create admin user
            let user = await prisma.user.findUnique({
              where: { email: credentials.email },
            })

            if (!user) {
              // Create admin user
              const adminId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
              user = await prisma.user.create({
                data: {
                  id: adminId,
                  email: credentials.email,
                  name: 'Du Daddy Admin',
                  role: 'admin',
                  image: 'https://ui-avatars.com/api/?name=Du+Daddy+Admin&background=de2529&color=ffffff',
                  emailVerified: new Date(),
                },
              })
            } else if (user.role !== 'admin') {
              // Update user to admin
              user = await prisma.user.update({
                where: { id: user.id },
                data: { 
                  role: 'admin',
                  name: 'Du Daddy Admin',
                  emailVerified: new Date(),
                },
              })
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role,
            }
          } else {
            throw new Error('Invalid admin password')
          }
        }

        // Regular OTP-based login for other users
        if (!credentials?.otp) {
          throw new Error('OTP is required for regular users')
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
