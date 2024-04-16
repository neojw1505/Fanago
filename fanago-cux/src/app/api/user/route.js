import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const email = request.nextUrl.searchParams.get("email")
    console.log("email", email)
    const res = await fetch(`${url}/user/get?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    cookies().set("customerId", data.data.userId)
    console.log("customerId set")
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
        username: req.email,
        email: req.email,
        phoneNumber: null,
        roleId: 1,
      },
    }
    const res = await fetch(`${url}/user/create`, {
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
    cookies().set("customerId", data.data.userId)
    return NextResponse.json({ status: "success", data: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}

export async function PATCH(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const payload = {
      data: {
        username: req.username,
        email: req.email,
        phoneNumber: req.phoneNumber,
      },
    }
    const res = await fetch(`${url}/user/update`, {
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
