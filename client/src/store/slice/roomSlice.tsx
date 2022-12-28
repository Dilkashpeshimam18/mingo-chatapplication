import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type RoomType = {
    roomName: string | number,
    roomUrl: string
}

export type AllRoomType = {
    allRoom: RoomType[],
    singleRoom: RoomType
}


const initialRoomState: AllRoomType = {
    allRoom: [],
    singleRoom: {
        roomName: '',
        roomUrl: ''
    }
}


const RoomSlice = createSlice({
    name: 'room',
    initialState: initialRoomState,
    reducers: {
        addRoom(state, action: PayloadAction<RoomType>) {
            state.singleRoom = action.payload
        },
        addToRoomList(state, action: PayloadAction<any>) {
            state.allRoom.push(action.payload)
        }

    }

})

export const roomActions = RoomSlice.actions
export default RoomSlice.reducer