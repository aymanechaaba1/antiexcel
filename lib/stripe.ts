import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  typescript: true,
});

export default stripe;
