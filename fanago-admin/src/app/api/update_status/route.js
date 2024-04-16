import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
            eventGroupId: req.eventGroupId, // This is correctly mapped.
            status: req.status, // Changed from eventStatus to status.
            isBookingAllowed: req.isBookingAllowed, // Changed from bookingAllowed to isBookingAllowed.
        }
    };
    console.log("Data API", payload);

  
      const res = await fetch(`${url}/event-manager/update-event-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (res.status !== 200) {
        const errorBody = await res.text(); // Or res.json() if the error returns in JSON format
        console.error('Error response:', errorBody);
        throw new Error(`HTTP Status ${res.status}: ${errorBody}`);
      }
  
      const data = await res.json();
  
      return NextResponse.json({ status: "success", data: data });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ status: "error", message: err.message });
    }
  }