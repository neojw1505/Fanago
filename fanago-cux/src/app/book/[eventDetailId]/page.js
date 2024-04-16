"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { ChevronLeft, MinusCircle, PlusCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/Toaster/use-toast"
import CapitolTheatre from "@/components/CapitolTheatre"
import NationalStadium from "@/components/NationalStadium"

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function BookingPage({ params: { eventDetailId } }) {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const venueName = searchParams.get("venueName")
  const venueId = searchParams.get("venueId")
  const venueAdd = searchParams.get("venueAdd")

  const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    router.push("/auth")
  }
  const [eventDetailData, setEventDetailData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [selectedSeatId, setSeatId] = useState(null)
  const [selectedEventArea, setEventArea] = useState(null)
  const [selectedSeatPrice, setSeatPrice] = useState(0)
  const [selectedSeatCategory, setSeatCategory] = useState(null)
  const [selectedTicketNum, setTicketNum] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [cart, setCart] = useState({
    customerId: 0,
    eventGroupDetailId: 0,
    eventVenueAreaId: 0,
    eventName: null,
    seatId: null,
    seatCategory: null,
    seatPrice: 0,
    ticketNum: 0,
    total: 0,
  })
  async function getBookingDetails(id) {
    try {
      const res = await fetch(`/api/book?eventGroupDetailId=${id}`)
      const resData = await res.json()
      setEventDetailData(resData.data.data)
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
    getBookingDetails(eventDetailId)
  }, [])

  function formatTime(time) {
    let date = new Date(time)
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
    }
    return date.toLocaleDateString("en-SG", options)
  }

  const handleSeatSelection = (selectedSeatId, eventVenueAreaId) => {
    setSeatId(selectedSeatId)
    setTicketNum(0)
    setSubTotal(0)
  }

  useEffect(() => {
    if (selectedSeatId) {
      const seat = eventDetailData.venueAreas.find(
        (seat) => seat.position === selectedSeatId
      )
      if (seat !== undefined) {
        setSeatPrice(seat.price.toFixed(2))
        setEventArea(seat.eventVenueAreaId)
        setSeatCategory(seat.category)
      } else {
        console.error(`Seat with ID ${selectedSeatId} not found.`)
        setSeatPrice(0)
        setSeatCategory(null)
      }
    }
  }, [selectedSeatId])

  useEffect(() => {
    if (selectedTicketNum > 0) {
      setSubTotal(selectedSeatPrice * selectedTicketNum)
      setCart({
        customerId: session.user.name,
        eventGroupDetailId: eventDetailData.eventGroupDetailId,
        eventName: eventDetailData.eventGroup.name,
        eventVenueAreaId: selectedEventArea,
        seatId: selectedSeatId,
        seatPrice: selectedSeatPrice,
        seatCategory: selectedSeatCategory,
        ticketNum: selectedTicketNum,
        total: selectedSeatPrice * selectedTicketNum * 1.09,
      })
      console.log(cart)
    } else {
      setSubTotal(0)
      setCart({
        customerId: 0,
        eventGroupDetailId: 0,
        eventName: null,
        eventVenueAreaId: 0,
        seatId: null,
        seatPrice: 0,
        seatCategory: null,
        ticketNum: 0,
        total: 0,
      })
    }
  }, [selectedTicketNum])

  const checkoutHandler = async () => {
    if (!selectedSeatId) {
      return
    }
    if (selectedSeatPrice === undefined) {
      console.error(`Seat with ID ${selectedSeatId} not found.`)
      return
    }
    console.log(cart)
    try {
      const stripe = await asyncStripe
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify(cart),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
        if (error) {
          const payload = {
            ticketId: null,
            paymentIntentId: null,
            amount: cart.total,
            dateTime: new Date().toISOString(),
            type: "CHARGE",
            status: "FAILED",
          }
          await fetch("/api/transaction", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          })
          throw error
        }
      } else {
        throw new Error("Session ID missing")
      }
    } catch (err) {
      console.log(err)
      router.push("/payment/error")
    }
  }
  if (isLoading) return <p className="p-5 text-center">Loading...</p>
  if (!eventDetailData) return <p className="p-5 text-center">No data</p>

  return (
    <main className="container mt-[2vw] min-h-[100vh-14] space-y-6 px-[4vw] pb-[10vh] dark:text-white">
      <div className="flex flex-row">
        <Button
          onClick={() => router.back()}
          variant="secondary"
          className="hidden items-center rounded-2xl sm:inline-flex"
        >
          <ChevronLeft className="max-h-[20px]" />
          <span className="my-auto text-sm font-semibold md:text-sm lg:text-base">
            Back to Event Details
          </span>
        </Button>
        <div className="text-md ml-auto text-right md:text-lg lg:text-xl">
          <h1 className="grow text-right text-lg font-bold md:text-xl lg:text-3xl">
            {eventDetailData.eventGroup.name}
          </h1>
          <HoverCard>
            {formatTime(eventDetailData.dateTime)} @{" "}
            <HoverCardTrigger>{venueName}</HoverCardTrigger>
            <HoverCardContent className="text-left">
              Address :
              <span className="font-bold">
                <br />
                {venueAdd}
              </span>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <p className="mb-4 text-right text-muted-foreground">
        Click on an area to book seats. You can select up to 4 tickets per area.
      </p>
      {venueId === "1" ? (
        <NationalStadium
          seatMap={eventDetailData.venueAreas}
          onSeatSelect={handleSeatSelection}
        />
      ) : venueId === "2" ? (
        <CapitolTheatre
          seatMap={eventDetailData.venueAreas}
          onSeatSelect={handleSeatSelection}
        />
      ) : (
        <p>Seatmap not available</p>
      )}

      <div>
        <p className="mb-4 text-muted-foreground">
          Area that have no more seats available will be disabled.
        </p>
        <Table className="overflow-visible text-sm font-semibold md:text-base lg:text-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Seatmap Area</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedSeatId ? (
              <TableRow key={selectedSeatId}>
                <TableCell className="w-1/4">{selectedSeatId}</TableCell>
                <TableCell className="w-1/4">{selectedSeatCategory}</TableCell>
                <TableCell className="w-1/4">
                  {"$"}
                  {selectedSeatPrice}
                </TableCell>
                <TableCell className="flex w-1/4 flex-row place-items-center">
                  <Button
                    onClick={() =>
                      selectedTicketNum !== 1
                        ? setTicketNum(selectedTicketNum - 1)
                        : null
                    }
                    variant="secondary"
                    className="m-0 h-min w-min rounded-full p-0"
                  >
                    <MinusCircle className="max-h-[20px]" />
                  </Button>
                  <span className="mx-4 text-center">{selectedTicketNum}</span>
                  <Button
                    onClick={() =>
                      selectedTicketNum !== 4
                        ? setTicketNum(selectedTicketNum + 1)
                        : null
                    }
                    variant="secondary"
                    className="m-0 h-min w-min rounded-full p-0"
                  >
                    <PlusCircle className="max-h-[20px]" />
                  </Button>
                </TableCell>
                <TableCell className="w-1/4 text-right">
                  {"$"}
                  {subTotal.toFixed(2)}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No items in cart
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {selectedSeatId ? (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>GST (9%)</TableCell>
                <TableCell className="text-right">
                  {"$"}
                  {(subTotal * 0.09).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  {"$"}
                  {(subTotal * 1.09).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </div>
      <div className="flex flex-row-reverse">
        {selectedSeatId && selectedTicketNum > 0 ? (
          <Button
            onClick={checkoutHandler}
            variant="secondary"
            className="h-full grow rounded-2xl bg-blue-600 px-3 py-2 hover:bg-blue-900 md:grow-0 md:px-4 lg:grow-0 lg:px-6"
          >
            <span className="md:text-md font-semibold lg:text-lg">
              Checkout
            </span>
          </Button>
        ) : null}
      </div>
    </main>
  )
}
