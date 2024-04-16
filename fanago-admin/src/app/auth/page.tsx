"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { AuthCard } from "@/components/AuthCard"

export default function Auth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])
  return (
    <main className="text-5xl text-primary">
      <div>
        <AuthCard />
      </div>
    </main>
  )
}
