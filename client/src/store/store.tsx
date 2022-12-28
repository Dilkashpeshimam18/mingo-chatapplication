import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import roomReducer from './slice/roomSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch