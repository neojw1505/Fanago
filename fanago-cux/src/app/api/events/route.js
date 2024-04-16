import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const pageNo = request.nextUrl.searchParams.get("pageNo")
    const res = await fetch(
      `${url}/event/all-events?pageNo=${pageNo}&sortBy=eventGroupId`,
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