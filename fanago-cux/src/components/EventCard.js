"use client"

import Link from "next/link"

import ImageWithFallback from "./ImageWithFallback"

export default function EventCard({
  eventGroupId,
  title,
  location,
  time,
  image,
}) {
  function formatTime(time) {
    let date = new Date(time)
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return date.toLocaleDateString("en-SG", options)
  }

  return (
    <Link
      href={`/events/detail/${eventGroupId}`}
      passHref
      className="flex justify-center"
    >
      <div className="m-1 flex flex-shrink basis-full transform cursor-pointer flex-row items-start gap-4 rounded-xl bg-gray-900 p-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg md:m-2 lg:m-2">
        <div className="flex w-1/2 max-w-[24vw] shrink overflow-clip rounded-xl">
          <ImageWithFallback src={image} alt="Event Image"></ImageWithFallback>
        </div>
        <div className="flex h-full w-1/2 grow flex-col ">
          <div className="flex-grow">
            <h1 className="font-bold text-base md:text-md lg:text-lg">
              {title}
            </h1>
          </div>
          <div className="mt-[2vw]">
            {time.map((date, index) => (
              <p
                className="text-sm md:text-md lg:text-base"
                key={"A" + index}
              >
                {formatTime(date)}
              </p>
            ))}
          </div>
          <div className="mt-auto pt-[2vw]">
            <p className="lg:text-md text-xs font-light md:text-sm">
              {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
