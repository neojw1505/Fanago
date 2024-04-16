import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"
export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const image = request.nextUrl.searchParams.get("image")
    const res = await fetch(`${url}media/get/${image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    const data = res
    return NextResponse.json({ status: "success", url: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}