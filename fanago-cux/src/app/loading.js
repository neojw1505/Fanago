"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"

export default function Loading() {
  const [progress, setProgress] = useState(13)
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Progress value={progress} className="w-[60%]" />
    </div>
  )
}
