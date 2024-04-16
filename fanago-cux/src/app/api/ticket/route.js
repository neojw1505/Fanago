import { NextResponse } from "next/server"

export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  const customerId = request.nextUrl.searchParams.get("customerId")
  if (request.nextUrl.searchParams.get("ticketId") === null) {
    try {
      if (!customerId) {
        throw new Error(
          "customerId not found, please sign out and sign in again"
        )
      }
      const res = await fetch(
        `${url}/customer/get-all-tickets?customerId=${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      return NextResponse.json({ status: "success", data: data })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ status: "error", message: err.message })
    }
  } else {
    try {
      if (!customerId) {
        throw new Error(
          "customerId not found, please sign out and sign in again"
        )
      }
      const ticketId = request.nextUrl.searchParams.get("ticketId")
      const res = await fetch(
        `${url}/customer/get-ticket?ticketId=${ticketId}&customerId=${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      return NextResponse.json({ status: "success", data: data })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ status: "error", message: err.message })
    }
  }
}

export async function PATCH(request) {
  const ticketId = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const customerId = request.nextUrl.searchParams.get("customerId")
    if (!customerId) {
      throw new Error("customerId not found, please sign out and sign in again")
    }
    const payload = {
      data: {
        userId: customerId,
        customerId: customerId,
        ticketId: ticketId,
      },
    }
    const res = await fetch(`${url}/customer/cancel-ticket`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    return NextResponse.json({ status: "success", data: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}
