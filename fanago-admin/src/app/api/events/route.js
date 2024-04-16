import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

// GET ALL EVENTS
export async function GET() {
  const url = process.env.BACKEND_SERVICE_URL;
  console.log ("Events URL Test", url)
  try {
    const res = await fetch(`${url}/event/all-events?pageNo=0&sortBy=eventGroupId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    const data = await res.json();
    console.log ("Events URL Data Test", data)

    return NextResponse.json({ success: true, data: data, timestamp: new Date().toISOString() });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}