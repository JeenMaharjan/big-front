import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";
import { bidReducer } from "./bidReducer";
import { conversation } from "./conversation";
import { demo } from "./demo";


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODReducer,
    bid: bidReducer,
    conversation: conversation,
    demo: demo
});

export default rootReducer;