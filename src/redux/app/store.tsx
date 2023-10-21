import {
    configureStore,
    type Action,
    type ThunkAction
} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>;
