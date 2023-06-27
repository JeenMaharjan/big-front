import axios from "axios";

export const userCart = async(cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`, { cart }, {
            headers: {
                authtoken,
            },
        }
    );

export const getUserCart = async(authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

export const emptyUserCart = async(authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

export const saveUserAddress = async(authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`, { address }, {
            headers: {
                authtoken,
            },
        }
    );

export const applyCoupon = async(authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`, { coupon }, {
            headers: {
                authtoken,
            },
        }
    );

export const getUsers = async(authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/users`, {
            headers: {
                authtoken,
            },
        }
    );


export const getUser = async(id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API}/users/${id}`
    )
    return res.data
}

export const uploadImage = async(images, authtoken) => {
    const res = await axios.put(
        `${process.env.REACT_APP_API}/user/profile`, { images }, {
            headers: {
                authtoken,
            }
        }
    )
    return res.data
}

export const findUsers = async(searchQuery, authtoken) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API}/users/find`, { searchQuery }, {
            headers: {
                authtoken,
            }
        }
    )
    return res.data
}

export const findOne = async(_id, authtoken) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API}/user/find`, { _id }, {
            headers: {
                authtoken,
            }
        }
    )
    return res.data
}

export const sendCoupon = async(email, coupon, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/sendcoupon`, { email, coupon }, {
            headers: {
                authtoken,
            },
        }
    );



export const createOrder = async(stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`, { stripeResponse }, {
            headers: {
                authtoken,
            },
        }
    );

export const getUserOrders = async(authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken,
        },
    });


export const getWishlist = async(authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
            authtoken,
        },
    });

export const removeWishlist = async(productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist`, { productId }, {
            headers: {
                authtoken,
            },
        }
    );

export const addToWishlist = async(productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`, { productId }, {
            headers: {
                authtoken,
            },
        }
    );

export const createCashOrderForUser = async(
        authtoken,
        COD,
        couponTrueOrFalse
    ) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`, { couponApplied: couponTrueOrFalse, COD }, {
            headers: {
                authtoken,
            },
        }
    );


export const UpdateProductStatus = async(id, status, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/update-status/${id}`, { status }, {
            headers: {
                authtoken,
            },
        }
    );