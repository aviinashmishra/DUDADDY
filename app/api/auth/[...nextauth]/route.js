import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcryptjs from 'bcryptjs'

// Comprehensive environment variable validation
function validateEnvironment() {
  // Skip validation during build time
  if (process.env.NEXT_PHASE === 'phase-production-build' || 
      process.env.NEXT_PHASE === 'phase-development-server' ||
      process.env.NODE_ENV === 'development') {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      hasGoogleOAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    }
  }

  const requiredVars = {
    NEXTAUTH_SECRET: {
      value: process.env.NEXTAUTH_SECRET,
      validator: (val) => val && val.length >= 32,
      error: 'NEXTAUTH_SECRET must be at least 32 characters long'
    },
    DATABASE_URL: {
      value: process.env.DATABASE_URL,
      validator: (val) => val && val.startsWith('postgresql://'),
      error: 'DATABASE_URL must be a valid PostgreSQL connection string'
    }
  }

  const conditionalVars = {
    GOOGLE_CLIENT_ID: {
      value: process.env.GOOGLE_CLIENT_ID,
      validator: (val) => val && val.length > 0,
      error: 'GOOGLE_CLIENT_ID is required for Google OAuth'
    },
    GOOGLE_CLIENT_SECRET: {
      value: process.env.GOOGLE_CLIENT_SECRET,
      validator: (val) => val && val.length > 0,
      error: 'GOOGLE_CLIENT_SECRET is required for Google OAuth'
    }
  }

  const errors = []
  const warnings = []

  // Check required variables
  Object.entries(requiredVars).forEach(([key, config]) => {
    if (!config.value) {
      errors.push(`Missing required environment variable: ${key}`)
    } else if (!config.validator(config.value)) {
      errors.push(`Invalid ${key}: ${config.error}`)
    }
  })

  // Check conditional variables (for Google OAuth)
  const hasGoogleId = !!process.env.GOOGLE_CLIENT_ID
  const hasGoogleSecret = !!process.env.GOOGLE_CLIENT_SECRET
  
  if (hasGoogleId && !hasGoogleSecret) {
    errors.push('GOOGLE_CLIENT_SECRET is required when GOOGLE_CLIENT_ID is provided')
  } else if (!hasGoogleId && hasGoogleSecret) {
    errors.push('GOOGLE_CLIENT_ID is required when GOOGLE_CLIENT_SECRET is provided')
  } else if (!hasGoogleId && !hasGoogleSecret) {
    warnings.push('Google OAuth not configured - only credentials authentication will be available')
  }

  // Check NEXTAUTH_URL for production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_URL) {
      // Try to auto-detect Vercel URL
      if (process.env.VERCEL_URL) {
        process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`
        console.log(`Auto-detected NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`)
      } else {
        errors.push('NEXTAUTH_URL is required in production environment. Set it to your domain (e.g., https://your-app.vercel.app)')
      }
    } else if (!process.env.NEXTAUTH_URL.startsWith('https://')) {
      errors.push('NEXTAUTH_URL must use HTTPS in production')
    }
  }

  // Log results
  if (warnings.length > 0) {
    console.warn('Environment warnings:', warnings)
  }

  if (errors.length > 0) {
    console.error('Environment validation failed:', errors)
    
    // Don't throw errors during build - only warn
    if (process.env.NEXT_PHASE) {
      console.warn('Environment validation failed during build. Please set environment variables in Vercel.')
    } else {
      console.warn('Environment validation failed. Some features may not work correctly.')
    }
  } else {
    console.log('Environment validation passed')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasGoogleOAuth: hasGoogleId && hasGoogleSecret
  }
}

// Only validate environment in runtime, not during build
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                   process.env.NEXT_PHASE === 'phase-development-server'

if (!isBuildTime) {
  // Run validation only at runtime
  try {
    validateEnvironment()
  } catch (error) {
    console.error('Environment validation error:', error.message)
  }
}

export const authOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
        // Ensure proper callback URL for production
        callbackUrl: process.env.NODE_ENV === 'production' 
          ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
          : 'http://localhost:3000/api/auth/callback/google'
      })
    ] : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' },
        loginType: { label: 'Login Type', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email) {
            throw new Error('Email is required')
          }

          // Dynamic import to avoid build-time database connection
          const { prisma } = await import('@/lib/prisma')
          
          if (!prisma) {
            throw new Error('Database connection failed. Please try again.')
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
              const adminId = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
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
            const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
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
        } catch (error) {
          console.error('Authorization error:', error)
          throw new Error(error.message || 'Authentication failed. Please try again.')
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
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
            const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
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
              token.id = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
              token.role = 'user'
              console.log('Google user not found in database, using temp ID')
            }
          } else {
            // If database not available, create a temporary ID
            token.id = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
            token.role = 'user'
            console.log('Database not available, using temp ID for Google user')
          }
        } catch (error) {
          console.error('Error fetching user in JWT callback:', error)
          // Fallback to temporary ID
          token.id = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  trustHost: true, // Important for Vercel deployment
  useSecureCookies: process.env.NODE_ENV === 'production',
  // Enhanced cookie configuration for production
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? undefined : undefined, // Let browser set domain
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', {
        code,
        metadata,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        url: process.env.NEXTAUTH_URL,
        vercelUrl: process.env.VERCEL_URL
      })
    },
    warn(code) {
      console.warn('NextAuth Warning:', {
        code,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      })
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth Debug:', code, metadata)
      }
    }
  },
  // Enhanced error handling for production
  events: {
    async signIn({ user, account, profile }) {
      console.log('Sign in event:', {
        userId: user?.id,
        email: user?.email,
        provider: account?.provider,
        timestamp: new Date().toISOString()
      })
    },
    async signOut({ session, token }) {
      console.log('Sign out event:', {
        userId: session?.user?.id || token?.id,
        timestamp: new Date().toISOString()
      })
    },
    async createUser({ user }) {
      console.log('User created:', {
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString()
      })
    },
    async session({ session, token }) {
      // Only log in development to avoid spam
      if (process.env.NODE_ENV === 'development') {
        console.log('Session accessed:', {
          userId: session?.user?.id || token?.id,
          timestamp: new Date().toISOString()
        })
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
