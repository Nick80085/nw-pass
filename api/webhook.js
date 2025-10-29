import Stripe from "stripe";
import { buffer } from "micro";

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // handle event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment completed:", session.customer_email, session.metadata.name);
    // TODO: send email with PDF here later
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log("Subscription renewal payment succeeded.");
  }

  res.json({ received: true });
}
