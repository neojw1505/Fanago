"use client"

import { useRouter } from "next/navigation"

export default function error() {
  const router = useRouter()
  setTimeout(() => {
    router.push("/")
  }, 3000)

  return (
    <main className="flex h-[calc(100vh-3.5rem)] items-center justify-center dark:text-white">
      <div className="text-center">
        Forgot to add something to your cart? Shop around then come back to pay!
      </div>
    </main>
  )
}
