import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
    axios.post(
        `${process.env.REACT_APP_API}/create-payment-intent`, { couponApplied: coupon }, {
            headers: {
                authtoken,
            },
        }
    );

export const khaltiPayment = (authtoken, coupon, payload) =>
    axios.post(
        `${process.env.REACT_APP_API}/create-khatli`, { couponApplied: coupon, payload }, {
            headers: {
                authtoken,

            },

        }
    );