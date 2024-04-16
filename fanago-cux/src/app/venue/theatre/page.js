"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import TheatreSeatmap from "public/capitol-theatre.svg"

export default function TheatrePage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  return (
    <div>
      <p className="md:text-md mt-4 text-base lg:text-lg">
        Seatmap View for <span className="font-semibold">{name}</span>
      </p>
      <Image
        src={TheatreSeatmap}
        alt="theatre"
        className="max-h-[80%] w-full rounded-2xl object-cover"
      />
    </div>
  )
}
