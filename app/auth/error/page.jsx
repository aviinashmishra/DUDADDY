'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages = {
    Configuration: 'Server configuration issue. Please contact support.',
    AccessDenied: 'Access denied. Please check your credentials.',
    Verification: 'Verification link expired. Please request a new one.',
    OAuthSignin: 'Error with OAuth provider. Please try again.',
    OAuthCallback: 'OAuth callback error. Please try signing in again.',
    OAuthCreateAccount: 'Could not create OAuth account. Please try again.',
    EmailCreateAccount: 'Could not create account. Please try again.',
    Callback: 'Authentication callback error. Please try again.',
    OAuthAccountNotLinked: 'Account not linked. Please sign in with the same provider you used before.',
    EmailSignin: 'Email sign-in error. Please check your email.',
    CredentialsSignin: 'Invalid credentials. Please check your email and password.',
    SessionRequired: 'Please sign in to access this page.',
    Default: 'Authentication error occurred. Please try again.',
  }

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          {/* DuDaddy Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-12 h-12" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5 L20 5 L30 10 L30 40 L20 45 L5 45 L5 5 Z" fill="url(#logoGradient)"/>
                <path d="M8 8 L8 42 L18 42 L26 37 L26 13 L18 8 L8 8 Z" fill="#0A0E1A"/>
                <rect x="22" y="5" width="3" height="40" fill="#de2529" transform="rotate(25 24 25)"/>
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#999999" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-2xl font-bold">
                <span className="text-white">Du</span>
                <span className="text-[#de2529]">Daddy</span>
              </span>
            </div>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Authentication Error
          </h2>
          <p className="mt-4 text-gray-400">{errorMessage}</p>
          {error && (
            <p className="mt-2 text-xs text-gray-500">Error Code: {error}</p>
          )}
        </div>
        
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#de2529] to-[#ff3b3f] hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-[#1A2332] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-[#de2529] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Loading...
            </h2>
          </div>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
