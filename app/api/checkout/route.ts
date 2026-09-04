import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pebble One — Reserve Deposit (Demo)",
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/#reserve`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
