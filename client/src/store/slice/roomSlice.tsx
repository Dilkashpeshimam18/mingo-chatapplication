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
    allRoom: JSON.parse(localStorage.getItem('allRoom') as any) || [],
    singleRoom: {
        roomName: '',
        roomUrl: ''
    },
    isSelectedRoom: 'Default',
    isRoom: false
}
let rooms = JSON.parse(localStorage.getItem('allRoom') as any)
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
        handleDefault(state) {
            state.isSelectedRoom = 'Default'
            state.isRoom = false
        }

    }

})

export const roomActions = RoomSlice.actions
export default RoomSlice.reducer