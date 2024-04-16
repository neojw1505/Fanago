import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

// GET ALL STATISTICS FOR AN EVENT
export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL;
  console.log ("Stats URL Test", url)

  try {
    const eventGroupId = request.nextUrl.searchParams.get("eventGroupId");
    const eventManagerId = request.nextUrl.searchParams.get("eventManagerId");
    const res = await fetch(`${url}/event-manager/event-statistic?eventGroupId=${eventGroupId}&eventManagerId=${eventManagerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    
    const data = await res.json();
    console.log ("Stats URL Data Test", data)

    // Assuming data is in the format { success: true, data: [...] }
    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}