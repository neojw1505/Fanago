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
        if (!credentials?.email || !credentials?.password) return null
        try {
          const res = await signIn({
            username: credentials.email,
            password: credentials.password,
          })
          console.log("Amplify SignIn response: ", res)
          const url = process.env.BACKEND_SERVICE_URL
          const userServerRes = await fetch(
            `${url}/user/get?email=${credentials.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const userServerData = await userServerRes.json()
          return {
            name: userServerData?.data.userId || null,
            email: credentials.email,
            isAuthenticated: res.isAuthenticated,
            image: "null",
          }
        } catch (err) {
          return null
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
  callbacks: {
    async session({ session, token }) {
      const user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
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
