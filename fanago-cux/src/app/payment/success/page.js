"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation"

export default function Success() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000)

  useEffect(() => {
    if (!loading) {
      router.push("/profile")
    }
  }, [loading])

  return (
    <main className="flex h-[calc(100vh-3.5rem)] items-center justify-center dark:text-white">
      <div className="text-center">
        We appreciate your business! If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </div>
    </main>
  )
}