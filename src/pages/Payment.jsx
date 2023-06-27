import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import KhaltiCheckout from "khalti-checkout-web";
import StripeCheckout from "../components/StripeCheckout.jsx";
import { khaltiPayment } from "../functions/stripe";
import axios from "axios";
import my_key from './khaltiKey.jsx';
import { getUserCart } from "../functions/user.js";
import "../stripe.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const [cartTotal, setcartTotal] = useState(0)
  const [totalAfterDiscount, settotalAfterDiscount] = useState(0)
     useEffect(() => {
        getUserCart(user.token).then((res) => 
        {setcartTotal(res.data.cartTotal) 
        settotalAfterDiscount(res.data.totalAfterDiscount)}
        )
  }, []);
  let config = {
    // replace this key with yours
    "publicKey": process.env.REACT_APP_KHALTI_P_KEY,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            
            
          toast.success("payment success")
            


  },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};
  let checkout = new KhaltiCheckout(config);
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      {/* <button onClick={checkout.show({amount : 1000  })}>Pay with Khalti</button> */}
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;