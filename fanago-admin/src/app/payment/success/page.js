"use client"

import { useRouter } from "next/navigation"

export default function success() {
  const router = useRouter()
  setTimeout(() => {
    router.push("/")
  }, 3000)
  return (
    <main className="flex h-[calc(100vh-3.5rem)] items-center justify-center dark:text-white">
      <div className="text-center">
        We appreciate your business! If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </div>
    </main>
  )
}
      // //Payment successful, create ticket in your system dummy data
      // const ticketPayload = {
      //   userId: 4,
      //   eventGroupDetailId: eventDetailData.eventGroupDetailId,
      //   eventVenueAreaId: selectedSeatId,
      //   customerEmail: "random@gmail.com",
      //   status: "ACTIVE",
      //   numberOfGuests: selectedTicketNum,
      // };
      // await fetch("/api/create-ticket", {
      //   method: "POST",
      //   body: JSON.stringify(ticketPayload),
      //   headers: { "Content-Type": "application/json" },
      // });
      // console.log("potratooo");

      