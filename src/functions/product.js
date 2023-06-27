import axios from "axios";

export const createProduct = async(product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });


export const getProductsByCount = async(count, status) =>
    await axios.post(`${process.env.REACT_APP_API}/products/${count}`, status);

export const getList = async(count) =>
    await axios.get(`${process.env.REACT_APP_API}/lists/${count}`);

export const removeProduct = async(slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const getProduct = async(slug) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
    return response.data;
}

export const updateProduct = async(slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });

export const getProducts = async(sort, order, page, status) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        page,
        status
    });

export const getProductsCount = async() =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async(productId, star, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`, { star }, {
            headers: {
                authtoken,
            },
        }
    );

export const getRelated = async(productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const fetchProductsByFilter = async(arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

export const PlaceNewBid = async(payload, authtoken) => {
    try {
        await axios.post(`${process.env.REACT_APP_API}/place-new-bid`, payload, {
            headers: {
                authtoken,
            }
        }, );


    } catch (error) {
        return error.message;
    }
};



// get all bids
export const GetAllBids = async(product) => {
    try {

        const response = await axios.post(`${process.env.REACT_APP_API}/get-all-bids`, product);

        return response.data;

    } catch (error) {
        return error.message;
    }
};

export const find = async(authtoken) => {
    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/product/find`, {
            headers: {
                authtoken,
            }
        });

        return response.data;

    } catch (error) {
        return error.message;
    }
};