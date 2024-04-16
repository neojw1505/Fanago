import { NextResponse } from "next/server"

export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const email = request.nextUrl.searchParams.get("email")
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
    return NextResponse.json({ status: "success", data: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}

export async function POST(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  console.log("Received request:", req);
    try {
    const payload = {
      data: {
        username: req.email,
        email: req.email,
        phoneNumber: "+6599999999",
        roleId: req.roleId,
      },
    }

    console.log("Payload to be sent:", payload);  // Log the payload data

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
    return NextResponse.json({ status: "success", data: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error 123", message: err.message })
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
        phoneNumber: "+6599999999",
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
