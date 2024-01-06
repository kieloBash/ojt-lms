"use server";
import { authUserClerk, updateStripeId } from "@/lib/actions/parent.action";
import { stripe } from "@/lib/stripe";
import { isParent } from "../isParent";
import connectDB from "@/lib/mongodb";
import Student from "@/lib/models/student.model";

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

export async function createCheckoutLink(
  customer: string,
  priceId: string,
  studentId: string
) {
  try {
    connectDB();
    const child = await Student.findById(studentId)
      .select("_id stripe_customer_id")
      .exec();

    if (!child || !child.stripe_customer_id)
      return { message: "Error in checkout", status: false };

    const checkout = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true&studentId=${studentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&fail=true&studentId=${studentId}`,
      customer: child.stripe_customer_id,
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
  } catch (error: any) {
    console.log(error);
    return { message: "Error in checkout", status: false };
  }
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

async function getSubscriptionId(customerId: string) {
  const customer: any = await stripe.customers.retrieve(customerId, {
    expand: ["subscriptions"],
  });

  if (customer?.subscriptions?.data.length > 0) {
    return customer?.subscriptions?.data[0].id;
  } else {
    // throw new Error("No active subscriptions for this customer");
    console.log("No active subscriptions for this customer");
    return;
  }
}

export async function generateStudentCustomerPortalLink(customerId: string) {
  if (customerId === "") return;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_SITE_URL + "/dashboard",
      // Add the subscription_update flow type and pass the subscription ID
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return "";
  }
}
export async function generateStudentCustomerUpdatePortalLink(
  customerId: string
) {
  if (customerId === "") return;

  const subscriptionId = await getSubscriptionId(customerId);

  if (!subscriptionId) return;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_SITE_URL + "/dashboard",
      // Add the subscription_update flow type and pass the subscription ID
      flow_data: {
        type: "subscription_update",
        subscription_update: {
          subscription: subscriptionId,
        },
      },
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return "";
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

export async function createChildStripeAccount({
  parentEmail,
  childId,
}: {
  parentEmail: string;
  childId: string;
}) {
  // const session = await authUserClerk();

  try {
    connectDB();

    const child = await Student.findById(childId)
      .select("_id stripe_customer_id")
      .exec();

    if (child.stripe_customer_id) return { message: "Existing Id" };

    const customerParent = await stripe.customers.create({
      email: String(parentEmail),
    });

    if (!customerParent) return { message: "Error in creation of Stripe" };

    const updatedChild = await Student.findByIdAndUpdate(childId, {
      stripe_customer_id: customerParent?.id as string,
    });

    return { message: "Update" };
  } catch (error: any) {
    console.log(error);
    return { message: "Error in creation of Stripe" };
  }
}

export async function getCheckoutInfo(sessionId: string) {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  return lineItems;
}
