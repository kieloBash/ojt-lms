"use server";
import { authUserClerk, updateStripeId } from "@/lib/actions/parent.action";
import { stripe } from "@/lib/stripe";
import { isParent } from "../isParent";

export async function hasSubscription() {
  const session = await authUserClerk();

  if (session && isParent(session)) {
    const subscriptions = await stripe.subscriptions.list({
      customer: String(session?.stripe_customer_id),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(customer: string, priceId: string, studentId:string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true&studentId=${studentId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&fail=true&studentId=${studentId}`,
    customer: customer,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
  });
  console.log(checkout);

  return checkout.url;
}

export async function generateCustomerPortalLink(
  customerId: string,
  isParent: boolean
) {
  if (!isParent) return;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_SITE_URL + "/dashboard",
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function createCustomerIfNull() {
  const session = await authUserClerk();
  if (session && isParent(session)) {
    if (!session?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: String(session.email),
      });

      const { data } = await updateStripeId(session?._id || "", customer.id);
      if (!data) throw new Error("Error in Updating Stripe Id");
      return { stripe_customer_id: customer.id } as any;
    }
  }
  return session;
}

export async function getCheckoutInfo(sessionId: string) {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  return lineItems;
}
