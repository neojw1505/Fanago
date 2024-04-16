import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET EVENT BY ID
export async function GET(request) {
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const eventGroupId = request.nextUrl.searchParams.get("eventGroupId");
    const res = await fetch(`${url}/event/get?eventGroupId=${eventGroupId}`, {
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

// Edit Event
export async function PATCH(request) {
  try {
    const req = await request.json();
    console.log("Backend API:", req);
    const eventGroupId = req.eventGroupId;
    console.log(eventGroupId);
    const url = process.env.BACKEND_SERVICE_URL;

    const payload = {
      data: {
          eventGroupId: req.eventGroupId,
          name: req.name, // Change to req.name
          venueId: req.venueId, // Change to req.venueId
          eventType: req.eventType, // Change to req.eventType
          timings: req.timings, // Change to req.timings
          bookingAllowed: req.bookingAllowed, // Change to req.bookingAllowed
          cancellationFee: req.cancellationFee, // Change to req.cancellationFee
          description: req.description, // Change to req.description
          eventManagerId: req.eventManagerId, // Change to req.eventManagerId
          posterImgUrl: req.posterImgUrl, // Change to req.posterImgUrl
          bannerImgUrl: req.bannerImgUrl, // Change to req.bannerImgUrl
          categoryPrices: req.categoryPrices // Change to req.categoryPrices
      }
    };

    const res = await fetch(`${url}/event-manager/update-event`, {
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

// Delete Event
export async function DELETE(request) {
  const url = process.env.BACKEND_SERVICE_URL;
  try {
    const eventGroupId = request.nextUrl.searchParams.get("eventGroupId");
    const res = await fetch(`${url}/event-manager/delete-event-group?eventGroupId=${eventGroupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("eventGroupId:", eventGroupId);

    if (!res.ok) {
      throw new Error(`Failed to delete event: ${res.statusText}`);
    }
    
    const data = await res.json();

    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    console.error("Error deleting event:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// CANCEL EVENT
export async function POST(request) {
  try {
    const req = await request.json(); // Assuming you're getting the necessary data from the request
    const url = process.env.BACKEND_SERVICE_URL;
    console.log('Cancel Event Request Body (API):', req);

    const payload = {
      data: {
        eventGroupId: req.eventGroupId, // Assuming this comes from the request
        eventManagerId: req.eventManagerId, // Assuming this comes from the request
        processRefund: req.processRefund // Assuming this to be a boolean value from the request
      }
    };

    const res = await fetch(`${url}/event-manager/cancel-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status !== 200) {
      throw new Error(`Failed to cancel event: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("CancelEventAPI", data);

    return new Response(JSON.stringify({ status: "success", data: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: "error", message: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
