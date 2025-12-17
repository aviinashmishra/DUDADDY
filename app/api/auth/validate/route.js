import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Environment validation
    const requiredVars = [
      'NEXTAUTH_SECRET',
      'DATABASE_URL'
    ]

    const optionalVars = [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'EMAIL_SERVER_USER',
      'EMAIL_SERVER_PASSWORD'
    ]

    const productionVars = [
      'NEXTAUTH_URL'
    ]

    const validation = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      vercelUrl: process.env.VERCEL_URL,
      nextauthUrl: process.env.NEXTAUTH_URL,
      variables: {},
      errors: [],
      warnings: [],
      status: 'unknown'
    }

    // Check required variables
    requiredVars.forEach(varName => {
      const value = process.env[varName]
      validation.variables[varName] = {
        present: !!value,
        length: value ? value.length : 0,
        valid: false
      }

      if (!value) {
        validation.errors.push(`Missing required variable: ${varName}`)
      } else {
        // Validate specific variables
        if (varName === 'NEXTAUTH_SECRET' && value.length < 32) {
          validation.errors.push('NEXTAUTH_SECRET must be at least 32 characters')
        } else if (varName === 'DATABASE_URL' && !value.startsWith('postgresql://')) {
          validation.errors.push('DATABASE_URL must be a valid PostgreSQL connection string')
        } else {
          validation.variables[varName].valid = true
        }
      }
    })

    // Check optional variables
    optionalVars.forEach(varName => {
      const value = process.env[varName]
      validation.variables[varName] = {
        present: !!value,
        length: value ? value.length : 0,
        valid: !!value
      }
    })

    // Check production-specific variables
    if (process.env.NODE_ENV === 'production') {
      productionVars.forEach(varName => {
        const value = process.env[varName]
        validation.variables[varName] = {
          present: !!value,
          length: value ? value.length : 0,
          valid: false
        }

        if (!value) {
          if (varName === 'NEXTAUTH_URL' && process.env.VERCEL_URL) {
            validation.warnings.push(`${varName} not set, but VERCEL_URL is available: ${process.env.VERCEL_URL}`)
          } else {
            validation.errors.push(`Missing production variable: ${varName}`)
          }
        } else {
          if (varName === 'NEXTAUTH_URL' && !value.startsWith('https://')) {
            validation.errors.push('NEXTAUTH_URL must use HTTPS in production')
          } else {
            validation.variables[varName].valid = true
          }
        }
      })
    }

    // Check Google OAuth configuration
    const hasGoogleId = !!process.env.GOOGLE_CLIENT_ID
    const hasGoogleSecret = !!process.env.GOOGLE_CLIENT_SECRET
    
    if (hasGoogleId && !hasGoogleSecret) {
      validation.errors.push('GOOGLE_CLIENT_SECRET required when GOOGLE_CLIENT_ID is set')
    } else if (!hasGoogleId && hasGoogleSecret) {
      validation.errors.push('GOOGLE_CLIENT_ID required when GOOGLE_CLIENT_SECRET is set')
    } else if (!hasGoogleId && !hasGoogleSecret) {
      validation.warnings.push('Google OAuth not configured')
    }

    // Test database connection
    try {
      const { prisma } = await import('@/lib/prisma')
      if (prisma) {
        await prisma.$queryRaw`SELECT 1`
        validation.database = {
          status: 'connected',
          message: 'Database connection successful'
        }
      } else {
        validation.database = {
          status: 'error',
          message: 'Prisma client not available'
        }
        validation.errors.push('Database connection failed: Prisma client not available')
      }
    } catch (error) {
      validation.database = {
        status: 'error',
        message: error.message
      }
      validation.errors.push(`Database connection failed: ${error.message}`)
    }

    // Determine overall status
    if (validation.errors.length === 0) {
      validation.status = 'healthy'
    } else if (validation.errors.length > 0 && validation.warnings.length === 0) {
      validation.status = 'error'
    } else {
      validation.status = 'warning'
    }

    // Return appropriate status code
    const statusCode = validation.status === 'healthy' ? 200 : 
                      validation.status === 'warning' ? 200 : 500

    return NextResponse.json(validation, { status: statusCode })

  } catch (error) {
    console.error('Validation endpoint error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Validation failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}