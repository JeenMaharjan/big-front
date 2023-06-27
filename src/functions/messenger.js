import axios from "axios";

export const conversation = async(senderId, receiverId, authtoken) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}/conversation`, { senderId, receiverId }, {
                headers: {
                    authtoken,
                },
            }
        );
        return response.data; // Return the response data

    } catch (error) {
        return error.message;
    }
};

export const getConversation = async(userId, authtoken) => {
    try {
        await axios.get(`${process.env.REACT_APP_API}/conversation/${userId}`, {
            headers: {
                authtoken,
            }
        }, );


    } catch (error) {
        return error.message;
    }
};

export const createMessage = async(message, authtoken) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/message/`, message, {
            headers: {
                authtoken,
            }
        }, );

        return response.data;
    } catch (error) {
        return error.message;
    }
};

export const getMessage = async(conversationId, authtoken) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API}/message/${conversationId}`, {
                headers: {
                    authtoken,
                },
            }
        );
        return response.data; // Return the response data

    } catch (error) {
        throw new Error(error.message);
    }
};