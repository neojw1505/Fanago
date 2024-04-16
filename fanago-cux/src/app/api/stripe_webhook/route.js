import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  const url = process.env.BACKEND_SERVICE_URL
  const payload = await request.text()
  const signature = request.headers.get("stripe-signature")
  let event = null
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    switch (event?.type) {
      case "checkout.session.completed":
        console.log(`🔔 Webhook received: ${JSON.stringify(event)}`)
        const paymentIntentId = event.data.object.payment_intent
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId)
        console.log(`🔔 Payment intent: ${JSON.stringify(paymentIntent)}`)
        const metadata = paymentIntent.metadata
        console.log(`🔔 Payment intent metadata: ${JSON.stringify(metadata)}`)
        // create ticket
        const ticket = await fetch(`${url}/customer/book-ticket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              eventGroupDetailId: metadata.eventGroupDetailId,
              eventVenueAreaId: metadata.eventVenueAreaId,
              customerId: metadata.customerId,
              status: "ACTIVE",
              bookingMethod: "ONLINE",
              numberOfGuests: metadata.numberOfGuests,
            },
          }),
        })
        if (ticket.status !== 201) {
          throw new Error(ticket.statusText)
        }
        const ticketData = await ticket.json()
        console.log(`🔔 Ticket created: ${JSON.stringify(ticketData)}`)
        // create transaction
        const res = await fetch(`${url}/transaction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ticketId: ticketData.data.ticketId,
              paymentIntentId: paymentIntentId,
              amount: paymentIntent.amount,
              dateTime: paymentIntent.created,
              type: "CHARGE",
              status: "SUCCESS",
            }
          }),
        })
        const transactionData = await res.json()
        if (res.status !== 200) {
          console.error(`❌ Error creating transaction: ${res.json()}`)
          throw new Error(res.statusText)
        }
        console.log(`🔔 Transaction created: ${JSON.stringify(transactionData)}`)
        break
      default:
        console.log(`🔔 Webhook received: ${JSON.stringify(event)}`)
        break
    }
    return NextResponse.json({ result: JSON.stringify(event), ok: true })
  } catch (err) {
    if (err instanceof Error) {
      console.error(`❌ Error verifying webhook signature: ${err}`)
      return NextResponse.json({ message: err.message }, { status: 400 })
    }
  }
  return NextResponse.json({ received: true })
}
