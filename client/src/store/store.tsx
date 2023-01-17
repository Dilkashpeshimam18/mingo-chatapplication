import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import roomReducer from './slice/roomSlice'
import modalReducer from './slice/modalSlice'
import messageReducer from './slice/messageSlice'
import messageSlice from "./slice/messageSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        modal: modalReducer,
        message: messageSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch