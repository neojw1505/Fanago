"use client"

import { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/Toaster/use-toast"
import VenueCard from "@/components/VenueCard"

export default function VenueLayout({ children }) {
  const [allVenues, setAllVenues] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { toast } = useToast()

  async function getAllVenues() {
    try {
      const res = await fetch(`/api/venue`)
      const data = await res.json()
      setAllVenues(data.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch venues", error)
      toast({
        title: "Error",
        description: "Failed to fetch venues",
        status: "error",
      })
    }
  }
  useEffect(() => {
    getAllVenues()
  }, [])

  function getHref(id, name) {
    if (id == 1) {
      return "/venue/stadium?name=" + name
    } else if (id == 2) {
      return "/venue/theatre?name=" + name
    }
    return "/venue/error"
  }

  if (isLoading) return <p className="p-5 text-center">Loading...</p>
  return (
    <main className="container min-h-[100vh-14] space-y-6 p-10 px-[2vw] dark:text-white">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Venue</h2>
        <p className="text-muted-foreground">View all venues.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex grow flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex flex-wrap lg:flex-col">
            {allVenues.toReversed().map((venue) => (
              <VenueCard
                key={venue.venueId}
                venueId={venue.venueId}
                name={venue.name}
                address={venue.address}
                href={getHref(venue.venueId, venue.name)}
              />
            ))}
          </nav>
        </aside>
        <div className="flex-1 grow">{children}</div>
      </div>
    </main>
  )
}
