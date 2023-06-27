import axios from "axios";

export const AddNotification = async(data, authtoken) => {


    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/notify`, data, {
            headers: {
                authtoken,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const GetAllNotifications = async(authtoken, userId) => {


    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/get-all-notifications`, { userId }, {
            headers: {
                authtoken,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const DeleteNotification = async(id, authtoken) => {


    try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/delete-notification/${id}`, {
            headers: {
                authtoken,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const ReadAllNotifications = async(authtoken) => {


    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/read-all-notifications`, {}, {
            headers: {
                authtoken,
            },
        });
        return response.data;
    } catch (error) {
        return console.log(error)
    }

}

export const getAdmin = async() => {


    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/notify-admin`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}