// load cart items from local storage
let initialState = [

];

// load cart items from local storage
if (typeof window !== "undefined") {
    if (localStorage.getItem("bid")) {
        initialState = JSON.parse(localStorage.getItem("bid"));
    } else {
        initialState = [];
    }
}

export const bidReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BID":
            return action.payload;
        default:
            return state;
    }
};