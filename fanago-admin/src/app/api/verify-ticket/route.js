import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const req = await request.json();
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const payload = {
      data: {
        eventGroupDetailId: 4,
        ticketId: req.ticketId,
      },
    };

    const res = await fetch(`${url}/ticketing-officer/verify-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(`Ticket is ${JSON.stringify(data.businessCode)}`);
    }

    const data = await res.json();
    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: err.message });
  }
}
