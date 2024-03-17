import React, { Component } from 'react';
import DropIn from "braintree-web-drop-in-react";

export default class Subscriptions extends Component {
    instance: any;
    state = {
        clientToken: null,
        purchaseComplete: false  
    };

    async buy() {
        try {
            // Send the nonce to your server
            const { nonce } = await this.instance.requestPaymentMethod();
            console.log({nonce})
            const res = await fetch('http://localhost:8080/api/user/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentMethodNonce: nonce, user_id: "1234" })
            });

            const result = await res.json();
            console.log({result})
            console.log("cc",result.result.result)
            if (result.result.result === "success") {
                this.setState({
                    purchaseComplete: true
                });
            } else {
                // Handle other result cases as needed
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error, e.g., show an error message to the user
        }
    }
        
    render() {
        if (this.state.purchaseComplete) {
            return (
                <div>
                    <h1>Completed.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <DropIn
                        options={{ authorization: "sandbox_q7nc2w95_6hjmcbvghc9srkkf"}}
                        onInstance={(instance) => (this.instance = instance)}
                    />
                    <button onClick={this.buy.bind(this)}>Submit</button>
                </div>
            );
        }
    }
}