#!/usr/bin/env node

const crypto = require('crypto')

console.log('🔐 Generating secure secrets for production...\n')

// Generate NEXTAUTH_SECRET
const nextAuthSecret = crypto.randomBytes(32).toString('base64')
console.log('NEXTAUTH_SECRET (copy this to Vercel):')
console.log(nextAuthSecret)
console.log()

// Generate JWT_SECRET
const jwtSecret = crypto.randomBytes(32).toString('hex')
console.log('JWT_SECRET (copy this to Vercel):')
console.log(jwtSecret)
console.log()

console.log('📋 Instructions:')
console.log('1. Copy these secrets to your Vercel environment variables')
console.log('2. Set NEXTAUTH_URL to your actual Vercel domain (e.g., https://your-app.vercel.app)')
console.log('3. Ensure all other environment variables are configured')
console.log('4. Redeploy your application')
console.log()
console.log('🔍 After deployment, visit /api/auth/validate to verify configuration')