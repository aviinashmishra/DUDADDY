import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'test',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'test',
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: true,
})

export { handler as GET, handler as POST }