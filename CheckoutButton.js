import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QMU7CJxWAQjxac3dnb1ftpCL0H9Bp4OOGemswOwnyyNipdTm4UOe68p9vI8Yhn1uSeVpan7rQ9CcNcOciJ6dAEu00RaUTZALk'); // Replace with your Publishable Key

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();

    // Redirect the user to the Stripe checkout page
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        padding: '10px 20px',
        backgroundColor: '#FFD700',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
