"use client"

import { useEffect, useState } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/Toaster/use-toast"
import EventCard from "@/components/EventCard"

export default function EventsPage() {
  const { toast } = useToast()
  const [isLoading, setLoading] = useState(true)
  const [pageNo, setPageNo] = useState(0)
  const [currPageEvents, setCurrPageEvents] = useState(null)
  const [nextPage, setNextPage] = useState(false)

  useEffect(() => {
    async function getCurrPageEvents() {
      try {
        const res = await fetch(`/api/events?pageNo=${pageNo}`)
        const resData = await res.json()
        setLoading(false)
        setCurrPageEvents(resData.data.data)
        checkIfNextPageExists(pageNo)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        toast({
          title: "Error",
          description: "Failed to fetch events.",
          status: "error",
        })
      }
    }
    async function checkIfNextPageExists() {
      try {
        const res = await fetch(
          `/api/events?pageNo=${pageNo + 1}&sortBy=eventGroupId`
        )
        const data = await res.json()
        if (data.data.data.length === 0) {
          setNextPage(false)
        } else {
          setNextPage(true)
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
        toast({
          title: "Error",
          description: "Failed to fetch events.",
          status: "error",
        })
      }
    }
    getCurrPageEvents(pageNo)
    checkIfNextPageExists(pageNo)
  }, [])

  const setPagination = (num) => {
    setPageNo(pageNo + num)
  }

  if (isLoading) return <p className="p-5 text-center">Loading...</p>
  if (!currPageEvents) return <p className="p-5 text-center">No data</p>

  return (
    <main className="container mt-[2vw] min-h-[100vh-14] px-[2vw] pb-24 dark:text-white">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currPageEvents &&
          currPageEvents.map((event) => (
            <EventCard
              key={event.eventGroupId}
              eventGroupId={event.eventGroupId}
              title={event.name}
              location={event.venue.name}
              time={event.timing}
              image={event.posterImgUrl}
            />
          ))}
      </div>
      <div className="mt-10 grid place-items-center">
        <Pagination>
          <PaginationContent className="grid-col-3 space-x-3">
            <PaginationItem className="w-[100px]">
              {pageNo > 0 && (
                <PaginationPrevious
                  onClick={() => setPagination(-1)}
                  className="cursor-pointer"
                />
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pageNo + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem className="w-[100px]">
              {nextPage && (
                <PaginationNext
                  onClick={() => setPagination(1)}
                  className="cursor-pointer"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  )
}
