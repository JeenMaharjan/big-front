export const conversation = (state = {}, action) => {
    switch (action.type) {
        case "SET_CONVERSATION":
            return action.payload;
        default:
            return state;
    }
};