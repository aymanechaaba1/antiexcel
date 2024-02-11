import stripe from '@/lib/stripe';
import prisma from '@/prisma/prismaClient';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.ENDPOINT_SECRET as string
    );
  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: `Webhook Error`,
    });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;

      const subscription = await stripe.subscriptions.retrieve(
        checkoutSessionCompleted.subscription as string
      );

      try {
        const user = await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata!.user_id,
          },
          data: {
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            stripe_price_id: subscription.items.data[0]?.price.id,
            stripe_current_period_end: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
      } catch (err) {
        console.error(`Failed to update user`);
      }

      break;

    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      const invoiceSubscription = await stripe.subscriptions.retrieve(
        invoicePaymentSucceeded.subscription as string
      );

      try {
        const user = await prisma.user.update({
          where: {
            stripe_subscription_id: invoiceSubscription.id,
          },
          data: {
            stripe_price_id: invoiceSubscription.items.data[0].price.id,
            stripe_current_period_end: new Date(
              invoiceSubscription.current_period_end * 1000
            ),
          },
        });
      } catch (err) {
        console.error(`Failed to updated user`);
      }

      break;

    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;

      const user = await prisma.user.update({
        where: {
          stripe_subscription_id: customerSubscriptionUpdated.id,
        },
        data: {
          cancel_at: customerSubscriptionUpdated.cancel_at
            ? new Date(customerSubscriptionUpdated.cancel_at * 1000)
            : null,
        },
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, {
    status: 200,
  });
}
