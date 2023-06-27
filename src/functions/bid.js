import axios from "axios";

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
export const GetAllBids = async(filters, authtoken) => {
    try {

        const response = await axios.post(`${process.env.REACT_APP_API}/get-all-bids`, filters, {
            headers: {
                authtoken,
            },
        });

        return response.data;

    } catch (error) {
        return error.message;
    }
};