"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000)

  useEffect(() => {
    if (!loading) {
      router.push("/")
    }
  }, [loading])

  return (
    <main className="flex h-[calc(100vh-3.5rem)] items-center justify-center dark:text-white">
      <div className="text-center">
        Forgot to add something to your cart? Shop around then come back to pay!
      </div>
    </main>
  )
}