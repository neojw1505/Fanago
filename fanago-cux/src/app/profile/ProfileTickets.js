"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/Toaster/use-toast"

export default function ProfileTickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await fetch("/api/ticket?customerId=" + session.user.name)
        const tickets = await res.json()
        console.log("Tickets:", tickets)
        if (!tickets.data.status == "success") {
          throw new Error("Failed to fetch tickets")
        }
        setTickets(tickets.data.data)
        setLoading(false)
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        })
      }
    }
    fetchTickets()
  }, [])
  function showTicket(ticketId) {
    router.push(`/ticket/${ticketId}`)
  }
  async function handleCancellation(ticketId, eventTime) {
    try {
      const currTime = new Date()
      console.log("Current time:", currTime.toISOString())
      const eventDateTime = new Date(eventTime)
      console.log("Event time:", eventDateTime.toISOString())
      if (eventDateTime - currTime < 48 * 60 * 60 * 1000) {
        throw new Error("Cannot cancel ticket within 48 hours of event")
      }
      const ticket = await fetch(
        "/api/ticket?customerId=" + session.user.name,
        {
          method: "PATCH",
          body: JSON.stringify(ticketId),
          headers: { "Content-Type": "application/json" },
        }
      )
      const ticketData = await ticket.json()
      if (!ticketData.data.status == "success") {
        throw new Error("Failed to patch ticket")
      }
      // get payment intent for refund
      const transaction = await fetch(`/api/transaction?ticketId=${ticketId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const transactionData = await transaction.json()
      if (!transactionData.data.status == "success") {
        throw new Error("Failed to fetch transaction data")
      }
      const paymentIntentId = transactionData.data.data[0].paymentIntentId
      console.log("Refunding payment for payment intent:", paymentIntentId)
      // refund payment
      const refund = await fetch("/api/refund", {
        method: "POST",
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
        }),
        headers: { "Content-Type": "application/json" },
      })
      const refundData = await refund.json()
      console.log("Refund data:", refundData)
      if (refundData.status == "error") {
        throw new Error(refundData.message)
      }
      toast({
        title: "Success",
        description: "Ticket has been cancelled successfully",
        status: "success",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      })
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tickets</h3>
        <p className="text-sm text-muted-foreground">
          View all purchased tickets.
        </p>
      </div>
      <Separator />
      {loading ? (
        <div>Loading...</div>
      ) : tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Card key={ticket.ticketId} className="border-0 bg-gray-900">
            <CardHeader className="flex flex-row">
              <div>
                <CardTitle className="md:text-md flex grow text-sm lg:text-lg">
                  {ticket.eventGroupDetail.eventGroup.name}
                </CardTitle>
                <CardDescription className="lg:text-md text-xs md:text-sm">
                  {ticket.eventGroupDetail.dateTime} at{" "}
                  {ticket.eventGroupDetail.eventGroup.venue.name}{" "}
                </CardDescription>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className={`lg:text-md ml-auto inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:text-sm ${
                      ticket.status === "CANCELLED_BY_CUSTOMER"
                        ? "cursor-not-allowed bg-gray-400 text-gray-800"
                        : "bg-destructive text-destructive-foreground"
                    }`}
                    disabled={ticket.status === "CANCELLED_BY_CUSTOMER"}
                  >
                    {ticket.status === "CANCELLED_BY_CUSTOMER"
                      ? "Refunded"
                      : "Cancel"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-0">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleCancellation(
                          ticket.ticketId,
                          ticket.eventGroupDetail.dateTime
                        )
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                className="ml-2"
                variant="outline"
                onClick={() => showTicket(ticket.ticketId)}
              >
                View eTicket
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {ticket.ticketSeats.length > 0 ? (
                ticket.ticketSeats.map((ticketSeat) => (
                  <Card
                    key={ticketSeat.seat.seatId}
                    className="my-1 mr-1 border-0"
                  >
                    <CardHeader>
                      <CardTitle className="text-xs md:text-sm">
                        Event Area: {ticketSeat.seat.eventVenueAreaId} - Row:{" "}
                        {ticketSeat.seat.seatRow} Col: {ticketSeat.seat.seatCol}
                      </CardTitle>
                      <CardDescription>
                        SeatID: {ticketSeat.seat.seatId}
                      </CardDescription>
                      <CardDescription>
                        Event Category: {ticketSeat.seat.category}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div>No seats found</div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No Tickets Found</div>
      )}
    </div>
  )
}
