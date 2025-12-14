# DuDaddy Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Environment Variables Setup

In your Vercel dashboard, add these environment variables:

```bash
# Database (Required)
DATABASE_URL=your-postgresql-connection-string
DIRECT_URL=your-postgresql-direct-connection-string

# NextAuth (Required)
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters

# Google OAuth (Required for Google Sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (Required for OTP)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com

# JWT Secret (Required for OTP)
JWT_SECRET=your-jwt-secret-key

# Currency Symbol (Optional)
NEXT_PUBLIC_CURRENCY_SYMBOL=₹
```

### 2. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Add these authorized redirect URIs:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google (for development)
   ```

### 3. Database Setup

#### Option A: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to Storage → Create Database → Postgres
2. Copy the connection strings to your environment variables

#### Option B: External Database (Neon, Supabase, etc.)
1. Create a PostgreSQL database
2. Copy the connection string to `DATABASE_URL`
3. Copy the direct connection string to `DIRECT_URL`

### 4. Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

#### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### 5. Post-Deployment Setup

1. **Run Database Migration:**
   ```bash
   npx prisma db push
   ```

2. **Seed Products (Optional):**
   Visit: `https://your-app-name.vercel.app/api/seed-products` (POST request)

3. **Test Authentication:**
   - Visit your deployed app
   - Try Google OAuth sign-in
   - Try email OTP sign-in

## 🔧 Troubleshooting Common Issues

### Authentication Errors

**Error: "Configuration"**
- Check `NEXTAUTH_URL` matches your Vercel domain exactly
- Ensure `NEXTAUTH_SECRET` is at least 32 characters

**Error: "OAuthCallback"**
- Verify Google OAuth redirect URIs include your Vercel domain
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

**Error: "Database not available"**
- Verify `DATABASE_URL` is correct and accessible
- Check database connection limits

### Build Errors

**Prisma Client Error:**
```bash
npx prisma generate
npx prisma db push
```

**Environment Variables Not Found:**
- Ensure all required environment variables are set in Vercel dashboard
- Check for typos in variable names

## 📋 Environment Variables Checklist

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `DIRECT_URL` - Direct PostgreSQL connection string  
- [ ] `NEXTAUTH_URL` - Your Vercel app URL
- [ ] `NEXTAUTH_SECRET` - Random 32+ character string
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- [ ] `EMAIL_SERVER_USER` - Gmail address
- [ ] `EMAIL_SERVER_PASSWORD` - Gmail app password
- [ ] `EMAIL_FROM` - Same as EMAIL_SERVER_USER
- [ ] `JWT_SECRET` - Random secret for OTP tokens

## 🎯 Success Indicators

✅ App loads without errors
✅ Google OAuth sign-in works
✅ Email OTP sign-in works  
✅ Database queries execute successfully
✅ Admin panel accessible
✅ Products display correctly

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test database connectivity
4. Check Google OAuth configuration
5. Review NextAuth.js documentation

## 🔗 Useful Links

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)