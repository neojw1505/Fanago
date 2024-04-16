import { NextResponse } from "next/server"

export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const ticketId = request.nextUrl.searchParams.get("ticketId")
    const res = await fetch(`${url}/transaction/ticket/${ticketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function POST(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const payload = {
      data: {
        ticketId: req.ticketId,
        paymentIntentId: req.paymentIntentId,
        amount: req.amount,
        dateTime: req.dateTime,
        type: req.type,
        status: req.status,
      },
    }
    const res = await fetch(`${url}/transaction`, {
      method: "POST",
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
