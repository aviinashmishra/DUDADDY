# 🔧 Vercel Authentication "Configuration" Error Fix

## 🚨 Common Causes of "Configuration" Error

The "Configuration" error in NextAuth.js on Vercel is usually caused by:

1. **Incorrect NEXTAUTH_URL** - Must match your exact Vercel domain
2. **Missing or incorrect NEXTAUTH_SECRET** - Must be 32+ characters
3. **Google OAuth redirect URI mismatch** - Must include your Vercel domain
4. **Environment variables not set in Vercel dashboard**
5. **Database connection issues in production**

## ✅ Step-by-Step Fix

### 1. **Set Correct NEXTAUTH_URL in Vercel**

In your Vercel dashboard → Environment Variables:

```bash
# ❌ WRONG
NEXTAUTH_URL=http://localhost:3000

# ✅ CORRECT (replace with your actual domain)
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### 2. **Generate and Set Secure NEXTAUTH_SECRET**

Run this command to generate a secure secret:

```bash
node generate-secrets.js
```

Copy the generated `NEXTAUTH_SECRET` to Vercel environment variables.

### 3. **Update Google OAuth Configuration**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel domain to **Authorized redirect URIs**:

```
https://your-app-name.vercel.app/api/auth/callback/google
```

### 4. **Verify All Environment Variables in Vercel**

Ensure these are set in your Vercel dashboard:

```bash
# Required for NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-32-character-secret

# Required for Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Required for Database
DATABASE_URL=your-postgresql-connection-string
DIRECT_URL=your-postgresql-direct-connection-string

# Required for Email OTP
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
JWT_SECRET=your-jwt-secret

# Optional
NEXT_PUBLIC_CURRENCY_SYMBOL=₹
```

### 5. **Redeploy After Changes**

After updating environment variables:
1. Go to Vercel dashboard → Deployments
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

## 🔍 Debugging Steps

### Test Your Configuration

1. **Check Environment Variables:**
   Visit: `https://your-app-name.vercel.app/api/auth/test`
   
   Should return:
   ```json
   {
     "success": true,
     "environment": {
       "NEXTAUTH_SECRET": true,
       "NEXTAUTH_URL": "https://your-app-name.vercel.app",
       "GOOGLE_CLIENT_ID": true,
       "GOOGLE_CLIENT_SECRET": true,
       "DATABASE_URL": true
     },
     "database": "connected"
   }
   ```

2. **Check NextAuth Providers:**
   Visit: `https://your-app-name.vercel.app/api/auth/providers`
   
   Should return Google and credentials providers.

3. **Check Vercel Function Logs:**
   - Go to Vercel dashboard → Functions
   - Click on your deployment
   - Check logs for any errors

### Common Error Messages and Solutions

| Error | Solution |
|-------|----------|
| `Configuration` | Check NEXTAUTH_URL and NEXTAUTH_SECRET |
| `OAuthCallback` | Update Google OAuth redirect URIs |
| `Database not available` | Verify DATABASE_URL is correct |
| `Invalid client` | Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET |

## 🎯 Quick Fix Checklist

- [ ] NEXTAUTH_URL matches your Vercel domain exactly
- [ ] NEXTAUTH_SECRET is 32+ characters and set in Vercel
- [ ] Google OAuth redirect URI includes your Vercel domain
- [ ] All environment variables are set in Vercel dashboard (not just .env file)
- [ ] Database is accessible from Vercel
- [ ] Redeployed after environment variable changes

## 🚀 Test Authentication

After applying fixes:

1. Visit your deployed app
2. Try Google OAuth sign-in
3. Try email/password sign-in
4. Check Vercel function logs for any errors

## 📞 Still Having Issues?

If you're still getting the Configuration error:

1. **Check Vercel Function Logs** for specific error messages
2. **Verify Environment Variables** are actually set in Vercel (not just locally)
3. **Test Database Connection** from Vercel environment
4. **Regenerate Secrets** and update all environment variables
5. **Clear Browser Cache** and try in incognito mode

## 🔗 Useful Commands

```bash
# Generate new secrets
node generate-secrets.js

# Test email configuration
node test-email.js

# Check database connection
npm run db:push

# Build and test locally
npm run build
npm start
```

Remember: Environment variables in your local `.env` file are NOT automatically available in Vercel. You must set them in the Vercel dashboard!