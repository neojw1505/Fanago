"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft, MinusCircle, PlusCircle } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/Toaster/use-toast";
import CapitolTheatre from "@/components/CapitolTheatre";
import NationalStadium from "@/components/NationalStadium";





const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function BookingPage({ params: { eventDetailId } }) {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const venueName = searchParams.get("venueName")
  const venueId = searchParams.get("venueId")
  const venueAdd = searchParams.get("venueAdd")


  const [eventDetailData, setEventDetailData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [selectedSeatId, setSeatId] = useState(null)
  const [selectedEventArea, setEventArea] = useState(null)
  const [selectedSeatPrice, setSeatPrice] = useState(0)
  const [selectedSeatCategory, setSeatCategory] = useState(null)
  const [customerEmail, setcustomerEmail] = useState("")
  const [selectedTicketNum, setTicketNum] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [cart, setCart] = useState({
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
        eventGroupDetailId: eventDetailData.eventGroupDetailId,
        eventName: eventDetailData.eventGroup.name,
        eventVenueAreaId: selectedEventArea,
        seatId: selectedSeatId,
        seatPrice: selectedSeatPrice,
        seatCategory: selectedSeatCategory,
        ticketNum: selectedTicketNum,
        total: selectedSeatPrice * selectedTicketNum * 1.09,
      })
    } else {
      setSubTotal(0)
      setCart({
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
      //Payment successful, create ticket in your system dummy data
      const ticketPayload = {
        userId: 4,
        eventGroupDetailId: eventDetailData.eventGroupDetailId,
        eventVenueAreaId: selectedEventArea,
        customerEmail: customerEmail,
        status: "ACTIVE",
        numberOfGuests: selectedTicketNum,

      };
      await fetch("/api/create-ticket", {
        method: "POST",
        body: JSON.stringify(ticketPayload),
        headers: { "Content-Type": "application/json" },
      });
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
          // await fetch("/api/transaction", {
          //   method: "POST",
          //   body: JSON.stringify(payload),
          //   headers: { "Content-Type": "application/json" },
          // });
          throw error
        }
      } else {
        throw new Error("Session ID missing")
      }
    }
    catch (err) {
      console.log(err)
      router.push("/payment/error")
    }
  }
  if (isLoading) return <p className="p-5 text-center">Loading...</p>
  if (!eventDetailData) return <p className="p-5 text-center">No data</p>
  // console.log(eventDetailData);
  // console.log(selectedEventArea);


  return (

    <DefaultLayout>
      <main className="container mt-[2vw] min-h-[100vh-14] space-y-6 px-[4vw] pb-[10vh] dark:text-white">
        <div className="flex flex-row">
          <div>

            <Link href={`../date/${eventDetailData.eventGroup.eventGroupId}`} className="hidden items-center sm:inline-flex">
              <Button variant="secondary" className="bg-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer">
                <ChevronLeft className="max-h-[20px]" />
                <span className="my-auto text-sm font-medium md:text-sm lg:text-base">
                  Back to Date Selection
                </span>
              </Button>
            </Link>
          </div>

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
        {/*------------- barcode search -------------*/}
        <div className="flex w-1/2">
          <div className="flex flex-col w-full">
            <span className="font-extrabold">Enter Customer Email</span>
            <div className="flex mt-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter customer email"
                  value={customerEmail}
                  onChange={(e) => setcustomerEmail(e.target.value)}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${customerEmail && (!customerEmail.includes("@") || !customerEmail.includes(".com")) && "border-red-500"
                    }`}
                />
                {customerEmail && (!customerEmail.includes("@") || !customerEmail.includes(".com")) && (
                  <p className="text-red-500">Please enter a valid email</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*------------- end of barcode search -------------*/}
        <div class="bg-bodydark1">
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
        </div>


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
              className="py-2.5 px-6  text-sm font-medium bg-black text-white rounded-md border-black hover:bg-opacity-50 transition duration-300 cursor-pointer"
            >
              <span className="md:text-md font-semibold lg:text-lg">
                Checkout
              </span>
            </Button>
          ) : null}
        </div>
      </main>
    </DefaultLayout>

  )
}