"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentHistory({ params }) {
  const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    router.push("/auth")
  }
  const [qrCodeUrl, setQrCodeUrl] = useState(null)
  const [ticket, setTicket] = useState(null)
  const [transaction, setTransaction] = useState(null)
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `/api/ticket?customerId=${session.user.name}&ticketId=${params.ticketId}`
        )
        const data = await res.json()
        console.log(data)
        setTicket(data.data.data)
        setQrCodeUrl(data.data.data.qrCodeImageUrl)
      } catch (error) {
        console.error("Failed to fetch ticket:", error)
      }
    }
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/transaction?ticketId=${params.ticketId}`)
        const data = await res.json()
        console.log(data.data.data[0])
        setTransaction(data.data.data[0])
      } catch (error) {
        console.error("Failed to fetch transaction:", error)
      }
    }
    fetchTicket()
    fetchTransaction()
  }, [])
  return (
    <main className="container min-h-[100vh-14] space-y-6 px-[2vw] pb-16 pt-[4vh] dark:text-white">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center">
          <h2 className="pb-1 text-2xl font-medium">Ticket Summary</h2>
          <p className="pb-5 text-sm text-muted-foreground">
            QR Code for ticket verification
          </p>
          {qrCodeUrl ? (
            <Image
              className="rounded"
              src={qrCodeUrl}
              width={200}
              height={200}
              alt="QR Code"
            />
          ) : (
            <Skeleton className="h-[200px] w-[200px]" />
          )}
        </div>
        <Separator />
        {ticket ? (
          <div className="flex w-full flex-col flex-wrap space-y-3">
            <h2 className="pb-1 text-xl font-medium text-blue-200 underline decoration-wavy underline-offset-8">
              Event Details
            </h2>
            <div className="text-sm">
              <span className=" text-blue-100">Name: </span>{" "}
              {ticket.eventGroupDetail.eventGroup.name}
            </div>
            <div className="text-sm">
              <span className="text-blue-100">DateTime: </span>
              {ticket.eventGroupDetail.dateTime}
            </div>
          </div>
        ) : (
          <div>Loading Summary...</div>
        )}
        <Separator />
        {transaction ? (
          <div className="flex w-full flex-col flex-wrap space-y-3">
            <h2 className="pb-1 text-xl font-medium text-blue-200 underline decoration-wavy underline-offset-8">
              Payment History
            </h2>
            <div className="text-sm">
              <span className=" text-blue-100">Status: </span>{" "}
              {transaction.status}
            </div>
            <div className="text-sm">
              <span className="text-blue-100">Payment Type: </span>
              {transaction.type}
            </div>
            <div className="text-sm">
              <span className="text-blue-100">Amount: </span>
              SGD {transaction.amount}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  )
}
