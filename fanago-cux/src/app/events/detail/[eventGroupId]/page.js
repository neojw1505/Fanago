"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useToast } from "@/components/ui/Toaster/use-toast"
import BannerWithFallback from "@/components/BannerWithFallback"

import policies from "./policies"

export default function EventDetailsPage({ params: { eventGroupId } }) {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [eventData, setEventData] = useState(null)
  const [isLoading, setLoading] = useState(true)
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
  async function getEventDetails(id) {
    try {
      const res = await fetch(`/api/event-group?eventGroupId=${id}`)
      const data = await res.json()
      setEventData(data.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch event details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch event details.",
        status: "error",
      })
    }
  }

  useEffect(() => {
    getEventDetails(eventGroupId)
  }, [])

  if (isLoading) return <p className="p-5 text-center">Loading...</p>
  if (!eventData) return <p className="p-5 text-center">No data</p>

  return (
    <main className="container mt-[2vw] min-h-[100vh-14] space-y-6 px-[4vw] dark:text-white">
      <Link
        href="/events"
        className="absolute hidden items-center sm:inline-flex"
      >
        <Button variant="secondary" className="h-min rounded-2xl">
          <ChevronLeft className="max-h-[20px]" />
          <span className="my-auto hidden text-sm font-semibold md:inline-flex lg:text-base">
            Back to Events
          </span>
        </Button>
      </Link>
      <div className="flex grow flex-col flex-wrap items-center space-y-4">
        <h1 className="text-lg font-bold md:text-xl lg:text-3xl">
          {eventData.name}
        </h1>
        <h3 className="text-md text-center md:text-lg lg:text-xl">
          {eventData.venue.name}
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <BannerWithFallback
          className="max-h-[60vh] w-full rounded-xl object-contain"
          src={eventData.bannerImgUrl}
          alt="Event Banner"
        />
      </div>
      <div className="text-md flex flex-col space-y-4 pb-24 md:text-lg lg:text-xl">
        <div className="space-y-2">
          <u className="font-semibold">Details</u>
          <p className="text-justify">{eventData.description}</p>
        </div>
        <div className="space-y-2">
          <u className="font-semibold">Prices</u>
          <div className="flex flex-col space-y-2">
            {eventData.eventGroupPricing.map((catPrice, index) => (
              <div key={"catPrice" + index} className="flex flex-row">
                <p>{`${catPrice.category}  : $${catPrice.price}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <u className="font-semibold">Admission Policy</u>
          <ul className="list-disc space-y-1 pl-5 text-justify">
            {policies.admission.map((policy) => (
              <li key={policies.admission.indexOf(policy)}>{policy}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <u className="font-semibold">Return Policy</u>
          <ol className="list-decimal space-y-1 pl-5 text-justify">
            {policies.return.map((policy) => (
              <li key={policies.return.indexOf(policy)}>{policy}</li>
            ))}
          </ol>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 flex w-full flex-row-reverse px-[6vw] py-8">
        <Drawer>
          <DrawerTrigger
            variant="secondary"
            className="m-0 rounded-2xl bg-indigo-800 px-3 py-2 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl md:px-4 lg:px-6"
          >
            <span className="md:text-md font-semibold lg:text-lg">
              Select Time
            </span>
          </DrawerTrigger>
          <DrawerContent className="container max-h-screen justify-center">
            <DrawerHeader className="flex flex-col items-center">
              <DrawerTitle>Select Time</DrawerTitle>
              <DrawerDescription>
                Choose the date and time for the event
              </DrawerDescription>
            </DrawerHeader>
            <div className="mb-10 flex flex-row flex-wrap items-center justify-center overflow-auto">
              {status === "authenticated" ? (
                eventData.eventGroupDetails.map((eventDetail) => (
                  <Link
                    href={`/book/${eventDetail.eventGroupDetailId}?venueId=${eventData.venue.venueId}&venueName=${eventData.venue.name}&venueAdd=${eventData.venue.address}`}
                    key={eventDetail.eventGroupDetailId}
                  >
                    <Button className="m-2 w-full whitespace-nowrap text-wrap bg-indigo-800 p-9 font-medium text-white hover:text-black sm:w-auto">
                      {formatTime(eventDetail.dateTime)}
                    </Button>
                  </Link>
                ))
              ) : (
                <DrawerFooter>
                  <div className="flex flex-row items-center justify-center space-x-4">
                    <Link href="/auth">
                      <Button
                        variant="outline"
                        className="bg-indigo-800 font-medium text-black"
                      >
                        Login to Book Tickets
                      </Button>
                    </Link>
                  </div>
                </DrawerFooter>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </footer>
    </main>
  )
}
