import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, type } = req.body;

  // price IDs from your Stripe dashboard
  const priceId =
    type === "monthly"
      ? process.env.STRIPE_PRICE_MONTHLY
      : process.env.STRIPE_PRICE_ONETIME;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: type === "monthly" ? "subscription" : "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    metadata: { name },
  });

  res.json({ url: session.url });
}
