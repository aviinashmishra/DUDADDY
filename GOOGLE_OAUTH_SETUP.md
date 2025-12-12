# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the DuDaddy application.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter project name: "DuDaddy Auth" (or any name you prefer)
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and click "Enable"
4. Also enable "Google Identity Services API" if available

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - **App name**: DuDaddy
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" for now, click "Save and Continue"
7. Add test users (your email and any other emails you want to test with)
8. Click "Save and Continue"

## Step 4: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Enter name: "DuDaddy Web Client"
5. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Click "Create"
8. Copy the **Client ID** and **Client Secret**

## Step 5: Update Environment Variables

Update your `.env` file with the credentials:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/signin`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your app

## Troubleshooting

### Error: "There is a problem with the server configuration"

This usually means:
1. **Invalid Client ID/Secret**: Double-check your credentials in `.env`
2. **Wrong Redirect URI**: Make sure the redirect URI in Google Console matches exactly
3. **API not enabled**: Ensure Google+ API is enabled in Google Cloud Console

### Error: "redirect_uri_mismatch"

1. Check that your redirect URI in Google Console is exactly:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
2. Make sure there are no trailing slashes or extra characters

### Error: "access_denied"

1. Make sure your app is not in "Testing" mode with restricted users
2. Add your email to the test users list in OAuth consent screen
3. If in production, submit your app for verification (if needed)

## Production Deployment

When deploying to production:

1. Add your production domain to Authorized JavaScript origins
2. Add your production callback URL to Authorized redirect URIs
3. Update `NEXTAUTH_URL` in your production environment variables
4. Consider submitting your app for Google verification if you expect many users

## Security Notes

- Never commit your `.env` file with real credentials
- Use different OAuth clients for development and production
- Regularly rotate your client secrets
- Monitor your OAuth usage in Google Cloud Console

## Support

If you encounter issues:
1. Check the browser console for detailed error messages
2. Check your server logs for NextAuth debug information
3. Verify all URLs match exactly between your app and Google Console
4. Ensure all required APIs are enabled in Google Cloud Console