const express = require('express');
const stripe = require('stripe')('sk_test_51QMU7CJxWAQjxac3AYg4e6EupyuR5R3i1M0EZ4Tm5U6tUk9VCEai2JI3afkk2oF7aFjOdOS4Fs2YBUcczGCtEd6200KvdvKa5y'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product Name',
            },
            unit_amount: 2000, // Amount in cents ($20.00)
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`, // Redirect after successful payment
      cancel_url: `${req.headers.origin}/cancel`,  // Redirect after canceled payment
    });

    res.json({ url: session.url }); // Return the session URL to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
