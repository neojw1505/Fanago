import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const { paymentIntentId } = await request.json()
  try {
    const res = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    })
    return NextResponse.json({ status: "success", data: res })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: "error", message: err.message })
  }
}
