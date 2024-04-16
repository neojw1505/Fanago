"use client"

import Link from "next/link"

export default function VenueCard({ venueId, name, address, href }) {
  return (
    <Link href={href}>
      <div className="m-1 flex flex-shrink basis-full transform cursor-pointer flex-row items-start gap-4 rounded-xl bg-gray-900 p-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg md:m-2 lg:m-2">
        <div className="flex h-full w-1/2 grow flex-col ">
          <div>
            <h1 className="text-md font-semibold md:text-lg lg:text-xl">
              {name}
            </h1>
          </div>
          <div className="mt-auto">
            <p className="lg:text-md text-xs md:text-sm">{address}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
