import config from "@/amplifyconfiguration.json"
import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

Amplify.configure(config)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);  // Check what's received
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await signIn({
            username: credentials.email,
            password: credentials.password,
            roleId: credentials.roleId
          });
          console.log("Amplify SignIn response: ", res);
      
          return {
            name: credentials.email,
            email: credentials.email,
            isAuthenticated: res.isAuthenticated,
            image: "null",
            roleId: credentials.roleId, // Ensure this is being set correctly
          }
        } catch (err) {
          console.error("SignIn error: ", err);
          return null;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth/page",
  },
  events: {
    signIn: async (signInData) => {
      try {
        return signInData
      } catch (error) {
        console.log(error)
        return null
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      const user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        roleId: token.roleId,  // Ensure this is included
      }
      const newSession = {
        ...session,
        user,
      }
      return newSession
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  site: process.env.NEXTAUTH_URL,
})

export { handler as GET, handler as POST }
