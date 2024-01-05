import Stripe from "stripe";
export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: "2023-10-16",
});
