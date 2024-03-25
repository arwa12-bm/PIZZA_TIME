import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import Button from '../components/form/Button';
import useCard from '../hooks/useCard';
import { formatPrice } from '../utils/formatPrice';

const Subscriptions = () => {
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const { cartTotalAmount,handleClearCart } = useCard();
    console.log("cc", cartTotalAmount.toFixed(2))
    let instance:any;


    const buy = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const res = await fetch('http://localhost:8080/api/user/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentMethodNonce: nonce, user_id: "1234", TotalAmount: cartTotalAmount.toFixed(2) })
            });

            const result = await res.json();
            if (result.result.result === "success") {
                try {
                    const response = await fetch('http://localhost:8080/api/panier/18', {
                        method: 'PUT',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to update shopping cart');
                    }
                    setPurchaseComplete(true);
                    //handleClearCart();
                } catch (error) {
                    console.error('Error updating shopping cart:', error);
                    // Handle the error
                }
            }else {
                // Handle other result cases as needed
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div>
            {purchaseComplete ? (
                <div>
                    <h1>Completed.</h1>
                </div>
            ) : (
                <div>
                    <DropIn
                        options={{ authorization: "sandbox_q7nc2w95_6hjmcbvghc9srkkf" }}
                        onInstance={(inst) => (instance = inst)}
                    />
                    <Button label={"Submit"} outline small onClick={buy} />
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
