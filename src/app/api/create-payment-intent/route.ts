import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json() as { amount: number };
        const { amount } = reqBody;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            //automatic_payment_methods: {
            //    enabled: true,
            //},
            payment_method_types: ['card', 'paypal', 'apple-pay', 'google-pay'],

        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: unknown) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: `Internal server error: ${errorMessage}` }, { status: 500 });
    }
}
