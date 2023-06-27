export const demo = (state = {}, action) => {
    switch (action.type) {
        case "GETUSER":
            return action.payload;

        default:
            return state;
    }
};