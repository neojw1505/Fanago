"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import ProfileTickets from "@/app/profile/ProfileTickets"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])

  return (
    <div className="space-y-6">
      <ProfileTickets />
    </div>
  )
}