import { NextResponse } from "next/server"

export async function POST(request) {
    const req = await request.json()
    const url = process.env.BACKEND_SERVICE_URL
    try {
        const payload = {
            data: {
                userId: req.userId,
                eventGroupDetailId: req.eventGroupDetailId,
                eventVenueAreaId: req.eventVenueAreaId,
                customerEmail: req.customerEmail,
                status: req.status,
                numberOfGuests: req.numberOfGuests,
            },
        }
        const res = await fetch(`${url}/ticketing-officer/book-ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (res.status !== 200) {
            throw new Error(res.statusText)
        }
        const data = await res.json()
        return NextResponse.json({ status: "success", data: data })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ status: "error", message: err.message })
    }
}
