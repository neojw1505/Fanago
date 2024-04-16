"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import StadiumSeatmap from "public/national-stadium.svg"

export default function StadiumPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  return (
    <div>
      <p className="text-md container mt-4 md:text-lg lg:text-xl">
        Seatmap View for <span className="font-semibold">{name}</span>
      </p>
      <Image
        src={StadiumSeatmap}
        alt="stadium"
        className="max-h-[80%] w-full rounded-2xl object-cover"
      />
    </div>
  )
}
