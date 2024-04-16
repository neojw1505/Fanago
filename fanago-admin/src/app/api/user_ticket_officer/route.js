import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL
  try {
    const payload = {
      data: {
        username: req.username,
        email: req.email,
        phoneNumber: req.phoneNumber,
        roleId: 3,
      },
    }
    const res = await fetch(`${url}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const data = await res.json();
      throw new Error(`User's ${JSON.stringify(data.message)}`);
    }
    const data = await res.json()
    return NextResponse.json({ status: "success", data: data })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}