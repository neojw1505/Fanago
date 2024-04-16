import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request) {
  const req = await request.json()
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const payload = {
      data: {
        ticketOfficerId: 4,
        ticketId: req.ticketId
      }
    };

    const res = await fetch(`${url}/ticketing-officer/redeem-ticket`, {
      method: "PATCH", // Change method to PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: err.message });
  }
}
