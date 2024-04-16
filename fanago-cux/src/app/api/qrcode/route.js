import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const customerId = cookies().get("customerId")
    if (!customerId) {
      throw new Error("customerId not found, please sign out and sign in again")
    }
    const payload = {
      ticketId: req.ticketId,
      customerId: customerId.value,
    }
    JSON.stringify(payload)
    const res = await fetch(`${url}/qr-code/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    const imageArrayBuffer = await res.arrayBuffer()
    return new NextResponse(imageArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}
