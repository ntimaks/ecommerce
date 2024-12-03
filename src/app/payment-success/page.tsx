"use client";

import { useState, useEffect } from 'react';

export default function PaymentSuccess({
    searchParams,
}: {
    searchParams: Promise<{ amount: string }>;
}) {
    const [amount, setAmount] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await searchParams;
                setAmount(data.amount);
            } catch (error) {
                console.error('Failed to get search params:', error);
            }
        };

        fetchData().catch(error => console.error('Error in useEffect:', error));
    }, [searchParams]);

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 bg-black">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl">You successfully sent</h2>
                <div className="bg-white p-2 rounded-md mt-5 text-4xl text-black">
                    ${amount}
                </div>
            </div>
        </main>
    );
}
