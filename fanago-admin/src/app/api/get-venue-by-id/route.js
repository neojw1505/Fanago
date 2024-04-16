import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

// GET VENUE BY ID
export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const venueId = request.nextUrl.searchParams.get("venueId")
    const res = await fetch(`${url}/venue/get?venueId=${venueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    
    const data = await res.json();

    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// Edit Venue
export async function PATCH(request) {
  try {
    const req = await request.json();
    const venueId = req.venueId;
    console.log(venueId);
    const url = process.env.BACKEND_SERVICE_URL;

    const payload = {
      data: {
        venueId: req.venueId,
        name: req.name,
        address: req.address,
      },
    };

    const res = await fetch(`${url}/event-manager/update-venue`, {
      method: "PATCH",
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


// Delete Venue
export async function DELETE(request) {
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const venueId = request.nextUrl.searchParams.get("venueId");
    const res = await fetch(`${url}/event-manager/delete-venue?venueId=${venueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(venueId)

    if (!res.ok) {
      throw new Error(`Failed to delete venue: ${res.statusText}`);
    }
    
    const data = await res.json();

    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    console.error("Error deleting venue:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}