import { NextResponse } from 'next/server'

// Comprehensive environment variable validation
function validateEnvironmentVariables() {
  const requiredVars = {
    NEXTAUTH_SECRET: {
      value: process.env.NEXTAUTH_SECRET,
      required: true,
      description: 'Secret key for NextAuth.js JWT signing',
      validation: (val) => val && val.length >= 32,
      errorMessage: 'NEXTAUTH_SECRET must be at least 32 characters long'
    },
    NEXTAUTH_URL: {
      value: process.env.NEXTAUTH_URL,
      required: true,
      description: 'Base URL for NextAuth.js callbacks',
      validation: (val) => val && (val.startsWith('http://') || val.startsWith('https://')),
      errorMessage: 'NEXTAUTH_URL must be a valid URL starting with http:// or https://'
    },
    GOOGLE_CLIENT_ID: {
      value: process.env.GOOGLE_CLIENT_ID,
      required: true,
      description: 'Google OAuth client ID',
      validation: (val) => val && val.length > 0,
      errorMessage: 'GOOGLE_CLIENT_ID is required for Google OAuth'
    },
    GOOGLE_CLIENT_SECRET: {
      value: process.env.GOOGLE_CLIENT_SECRET,
      required: true,
      description: 'Google OAuth client secret',
      validation: (val) => val && val.length > 0,
      errorMessage: 'GOOGLE_CLIENT_SECRET is required for Google OAuth'
    },
    DATABASE_URL: {
      value: process.env.DATABASE_URL,
      required: true,
      description: 'PostgreSQL database connection string',
      validation: (val) => val && val.startsWith('postgresql://'),
      errorMessage: 'DATABASE_URL must be a valid PostgreSQL connection string'
    },
    DIRECT_URL: {
      value: process.env.DIRECT_URL,
      required: false,
      description: 'Direct database URL for migrations',
      validation: (val) => !val || val.startsWith('postgresql://'),
      errorMessage: 'DIRECT_URL must be a valid PostgreSQL connection string if provided'
    },
    EMAIL_SERVER_USER: {
      value: process.env.EMAIL_SERVER_USER,
      required: false,
      description: 'Email server username for OTP delivery',
      validation: (val) => !val || val.includes('@'),
      errorMessage: 'EMAIL_SERVER_USER must be a valid email address if provided'
    },
    EMAIL_SERVER_PASSWORD: {
      value: process.env.EMAIL_SERVER_PASSWORD,
      required: false,
      description: 'Email server password for OTP delivery',
      validation: (val) => !val || val.length > 0,
      errorMessage: 'EMAIL_SERVER_PASSWORD must not be empty if provided'
    },
    JWT_SECRET: {
      value: process.env.JWT_SECRET,
      required: false,
      description: 'JWT secret for OTP token generation',
      validation: (val) => !val || val.length >= 16,
      errorMessage: 'JWT_SECRET must be at least 16 characters long if provided'
    }
  }

  const results = {
    isValid: true,
    missingVariables: [],
    invalidVariables: [],
    warnings: [],
    variables: {}
  }

  Object.entries(requiredVars).forEach(([key, config]) => {
    const { value, required, validation, errorMessage, description } = config
    
    results.variables[key] = {
      present: !!value,
      valid: false,
      description,
      error: null
    }

    if (!value) {
      if (required) {
        results.missingVariables.push(key)
        results.isValid = false
        results.variables[key].error = `${key} is required but not set`
      } else {
        results.warnings.push(`${key} is optional but not set - ${description}`)
      }
    } else {
      if (validation(value)) {
        results.variables[key].valid = true
      } else {
        results.invalidVariables.push(key)
        results.isValid = false
        results.variables[key].error = errorMessage
      }
    }
  })

  return results
}

// Test database connectivity with detailed error reporting
async function testDatabaseConnection() {
  const result = {
    status: 'disconnected',
    error: null,
    details: {},
    canConnect: false,
    canQuery: false
  }

  try {
    const { prisma } = await import('@/lib/prisma')
    
    if (!prisma) {
      result.error = 'Prisma client not available'
      return result
    }

    // Test connection
    await prisma.$connect()
    result.canConnect = true
    result.status = 'connected'

    // Test basic query
    try {
      await prisma.$queryRaw`SELECT 1 as test`
      result.canQuery = true
      result.details.queryTest = 'success'
    } catch (queryError) {
      result.details.queryTest = `failed: ${queryError.message}`
    }

    // Get database info
    try {
      const dbInfo = await prisma.$queryRaw`SELECT version() as version`
      result.details.version = dbInfo[0]?.version || 'unknown'
    } catch (versionError) {
      result.details.version = `error: ${versionError.message}`
    }

    await prisma.$disconnect()
    
  } catch (error) {
    result.error = error.message
    result.status = 'error'
    
    // Categorize common database errors
    if (error.message.includes('ENOTFOUND')) {
      result.details.category = 'DNS_RESOLUTION_FAILED'
      result.details.suggestion = 'Check if DATABASE_URL hostname is correct'
    } else if (error.message.includes('ECONNREFUSED')) {
      result.details.category = 'CONNECTION_REFUSED'
      result.details.suggestion = 'Check if database server is running and port is correct'
    } else if (error.message.includes('authentication failed')) {
      result.details.category = 'AUTHENTICATION_FAILED'
      result.details.suggestion = 'Check database username and password'
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      result.details.category = 'DATABASE_NOT_FOUND'
      result.details.suggestion = 'Check if database name is correct'
    } else {
      result.details.category = 'UNKNOWN_ERROR'
      result.details.suggestion = 'Check DATABASE_URL format and network connectivity'
    }
  }

  return result
}

// Test OAuth provider connectivity
async function testOAuthProviders() {
  const results = {
    google: {
      configured: false,
      accessible: false,
      error: null
    }
  }

  // Test Google OAuth configuration
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    results.google.configured = true
    
    try {
      // Test if we can reach Google's OAuth endpoints
      const response = await fetch('https://accounts.google.com/.well-known/openid_configuration', {
        method: 'GET',
        headers: { 'User-Agent': 'DuDaddy-Auth-Test/1.0' }
      })
      
      if (response.ok) {
        results.google.accessible = true
      } else {
        results.google.error = `Google OAuth endpoint returned ${response.status}`
      }
    } catch (error) {
      results.google.error = `Cannot reach Google OAuth endpoints: ${error.message}`
    }
  } else {
    results.google.error = 'Google OAuth credentials not configured'
  }

  return results
}

export async function GET() {
  try {
    console.log('Starting comprehensive authentication system validation...')
    
    // Validate environment variables
    const envValidation = validateEnvironmentVariables()
    console.log('Environment validation:', envValidation.isValid ? 'PASSED' : 'FAILED')
    
    // Test database connection
    const dbTest = await testDatabaseConnection()
    console.log('Database test:', dbTest.status)
    
    // Test OAuth providers
    const oauthTest = await testOAuthProviders()
    console.log('OAuth providers test completed')

    // Generate overall system status
    const systemStatus = {
      healthy: envValidation.isValid && dbTest.canConnect && dbTest.canQuery,
      readyForProduction: envValidation.isValid && 
                         dbTest.canConnect && 
                         dbTest.canQuery && 
                         oauthTest.google.configured && 
                         oauthTest.google.accessible
    }

    // Generate remediation instructions
    const remediationSteps = []
    
    if (envValidation.missingVariables.length > 0) {
      remediationSteps.push({
        priority: 'HIGH',
        category: 'Environment Variables',
        issue: `Missing required variables: ${envValidation.missingVariables.join(', ')}`,
        solution: 'Add the missing environment variables to your Vercel project settings'
      })
    }
    
    if (envValidation.invalidVariables.length > 0) {
      remediationSteps.push({
        priority: 'HIGH',
        category: 'Environment Variables',
        issue: `Invalid variables: ${envValidation.invalidVariables.join(', ')}`,
        solution: 'Fix the format/content of the invalid environment variables'
      })
    }
    
    if (!dbTest.canConnect) {
      remediationSteps.push({
        priority: 'CRITICAL',
        category: 'Database',
        issue: 'Cannot connect to database',
        solution: dbTest.details.suggestion || 'Check DATABASE_URL and network connectivity'
      })
    }
    
    if (!oauthTest.google.configured) {
      remediationSteps.push({
        priority: 'MEDIUM',
        category: 'OAuth',
        issue: 'Google OAuth not configured',
        solution: 'Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to environment variables'
      })
    }

    return NextResponse.json({
      success: true,
      systemStatus,
      environment: envValidation,
      database: dbTest,
      oauth: oauthTest,
      remediation: remediationSteps,
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'unknown'
    })
    
  } catch (error) {
    console.error('Validation endpoint error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}