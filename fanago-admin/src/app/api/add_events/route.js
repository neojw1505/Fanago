import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

// ADD EVENTS
export async function POST(request) {
    try {
      const req = await request.json();
      const url = process.env.BACKEND_SERVICE_URL;
      console.log('Request Body (API):', req);
  
      const payload = {
        data: {
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
  
      const res = await fetch(`${url}/event-manager/create-event`, {
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
      console.log("AddEventsAPI", data)
  
      return NextResponse.json({ status: "success", data: data });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ status: "error", message: err.message });
    }
  }
