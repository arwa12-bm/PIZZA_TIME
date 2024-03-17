import gateway from "../profile/gateway";

export default async function checkout(req:any, res:any) {
    try {
        // Use the payment method nonce here
        const nonceFromTheClient = req.body.paymentMethodNonce;

        // Create a customer
        const customerResult = await gateway.customer.create({
            id: req.body.user_id,
            email: "jen@example.com",
        });

        if (customerResult.success) {
            // Create a payment method
            const paymentMethodResult = await gateway.paymentMethod.create({
                customerId: req.body.user_id,
                paymentMethodNonce: nonceFromTheClient
            });

            if (paymentMethodResult.success) {
                // Create a subscription
                const subscriptionResult = await gateway.subscription.create({
                    paymentMethodToken: paymentMethodResult.paymentMethod.token,
                    planId: "basic_monthly"
                });

                if (subscriptionResult.success) {
                    // If everything is successful, send a success response
                    res.status(201).json({ 'result': 'success', 'subscription': subscriptionResult.subscription });
                } else {
                    res.status(500).send(subscriptionResult.message || 'Error creating subscription');
                }
            } else {
                res.status(500).send(paymentMethodResult.message || 'Error creating payment method');
            }
        } else {
            res.status(500).send(customerResult.message || 'Error creating customer');
        }
    } catch (error:any) {
        console.error('Error during checkout:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}
