import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type RoomType = {
    roomName: string | number,
    roomUrl: string,
}

export type AllRoomType = {
    allRoom: RoomType[],
    singleRoom: RoomType,
    isSelectedRoom: string | number,
    isRoom: boolean

}


const initialRoomState: AllRoomType = {
    allRoom: [],
    singleRoom: {
        roomName: '',
        roomUrl: ''
    },
    isSelectedRoom: 'Default',
    isRoom: false
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
        },
        handleIsSelectedRoom(state, action: PayloadAction<string | number>) {
            state.isSelectedRoom = action.payload
            state.isRoom = true

        },

    }

})

export const roomActions = RoomSlice.actions
export default RoomSlice.reducer