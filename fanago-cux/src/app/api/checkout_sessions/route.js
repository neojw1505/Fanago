import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const req = await request.json()
  const host = process.env.NEXT_PUBLIC_HOST
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "sgd",
            product_data: {
              name:
                req?.seatCategory + " " + "Ticket at Seat Area " + req?.seatId,
              description: req?.eventName,
            },
            unit_amount: req?.seatPrice * 100 || 100,
          },
          quantity: req?.ticketNum || 1,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      payment_intent_data: {
        metadata: {
          eventGroupDetailId: req?.eventGroupDetailId,
          eventVenueAreaId: req?.eventVenueAreaId,
          numberOfGuests: req?.ticketNum,
          customerId: req?.customerId,
        },
      },
      mode: "payment",
      success_url: `${host}/payment/success`,
      cancel_url: `${host}/payment/error`,
    })

    return NextResponse.json({ status: "success", sessionId: session.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}
