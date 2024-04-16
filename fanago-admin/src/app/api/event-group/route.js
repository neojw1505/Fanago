import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const eventGroupId = request.nextUrl.searchParams.get("eventGroupId")
    const res = await fetch(`${url}/event/get?eventGroupId=${eventGroupId}`, {
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
