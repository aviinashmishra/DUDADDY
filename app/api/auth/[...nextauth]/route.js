import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcryptjs from 'bcryptjs'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' },
        loginType: { label: 'Login Type', type: 'text' },
      },
      async authorize(credentials) {
        // Check if we're in build environment (only during actual build, not dev)
        if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production' && !process.env.DATABASE_URL) {
          throw new Error('Database not available during build')
        }

        if (!credentials?.email) {
          throw new Error('Email is required')
        }

        // Dynamic import to avoid build-time database connection
        const { prisma } = await import('@/lib/prisma')
        
        if (!prisma) {
          throw new Error('Database not available')
        }

        const loginType = credentials.loginType || 'password'

        if (loginType === 'password') {
          // Password-based authentication
          if (!credentials.password) {
            throw new Error('Password is required')
          }

          // Check if this is admin login
          if (credentials.email === 'dudaddyworld@gmail.com' && credentials.password === 'Dud@ddy01') {
            let user = await prisma.user.findUnique({
              where: { email: credentials.email },
            })

            if (!user) {
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
          }

          // Regular user password authentication
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user || !user.password) {
            throw new Error('Invalid email or password')
          }

          const isPasswordValid = await bcryptjs.compare(credentials.password, user.password)
          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        } else if (loginType === 'otp') {
          // OTP-based authentication
          if (!credentials.otp) {
            throw new Error('OTP is required')
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
        }

        throw new Error('Invalid login type')
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { user: user?.email, provider: account?.provider })
      
      if (account?.provider === 'google') {
        try {
          const { prisma } = await import('@/lib/prisma')
          
          if (!prisma) {
            console.error('Database not available for Google sign in')
            // Allow sign in even if database is not available, handle in JWT callback
            return true
          }
          
          // Check if user exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          })

          if (!existingUser) {
            // Create new user for Google OAuth
            const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const newUser = await prisma.user.create({
              data: {
                id: userId,
                email: user.email,
                name: user.name || user.email.split('@')[0],
                image: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email.split('@')[0])}&background=random`,
                emailVerified: new Date(),
              },
            })
            console.log('Created new Google user:', newUser.id)
          } else {
            // Update existing user with Google info
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                name: user.name || existingUser.name,
                image: user.image || existingUser.image,
                emailVerified: new Date(),
              },
            })
            console.log('Updated existing Google user:', existingUser.id)
          }
        } catch (error) {
          console.error('Error in Google sign in callback:', error)
          // Don't block sign in, let JWT callback handle it
          return true
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      console.log('JWT callback:', { hasUser: !!user, provider: account?.provider, email: token.email })
      
      if (user) {
        token.id = user.id
        token.role = user.role || 'user'
      }
      
      // For Google OAuth, get user info from database
      if (account?.provider === 'google' && token.email) {
        try {
          const { prisma } = await import('@/lib/prisma')
          if (prisma) {
            const dbUser = await prisma.user.findUnique({
              where: { email: token.email },
            })
            if (dbUser) {
              token.id = dbUser.id
              token.role = dbUser.role || 'user'
              console.log('Found Google user in database:', dbUser.id)
            } else {
              // If user not found in database, create a temporary ID
              token.id = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
              token.role = 'user'
              console.log('Google user not found in database, using temp ID')
            }
          } else {
            // If database not available, create a temporary ID
            token.id = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            token.role = 'user'
            console.log('Database not available, using temp ID for Google user')
          }
        } catch (error) {
          console.error('Error fetching user in JWT callback:', error)
          // Fallback to temporary ID
          token.id = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          token.role = 'user'
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role || 'user'
      }
      console.log('Session callback:', { userId: session.user?.id, role: session.user?.role })
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
