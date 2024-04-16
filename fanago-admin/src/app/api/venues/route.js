import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

// GET ALL VENUES
export async function GET() {
  const url = process.env.BACKEND_SERVICE_URL;

  try {
    // Perform the GET request to fetch all venues
    const res = await fetch(`${url}/venue/all-venues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    
    const data = await res.json();

    // Assuming data is in the format { success: true, data: [...] }
    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// Add Venue
export async function POST(request) {
  try {
    const req = await request.json()
    const url = process.env.BACKEND_SERVICE_URL;
    console.log("URL Test", url);

    const payload = {
      data: {
        name: req.name,
        address: req.address,
        seatMap: req.seatMap,
      }
    };

    const res = await fetch(`${url}/event-manager/create-venue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return NextResponse.json({ status: "success", data: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", message: err.message });
  }
}
