import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { AppDispatch } from '../store';
import { resolve } from "node:path/posix";

export type RoomType = {
    roomName: string | number,
    roomUrl: string,
    id?: string,
    createdBy?: string
}

export type AllRoomType = {
    allRoom: RoomType[],
    singleRoom: RoomType,
    isSelectedRoom: string | number,
    isRoom: boolean

}

let allRoomRef = collection(db, 'allRoom')

const initialRoomState: AllRoomType = {
    allRoom: JSON.parse(localStorage.getItem('allRoom') as any) || [],
    singleRoom: {
        roomName: '',
        roomUrl: '',
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
            state.allRoom = action.payload
        },
        handleIsSelectedRoom(state, action: PayloadAction<string | number>) {
            state.isSelectedRoom = action.payload
            state.isRoom = true

        },
        handleDefault(state) {
            state.isSelectedRoom = 'Default'
            state.isRoom = false
        },
        // isEditRoom(state,action:PayloadAction<any>){
        //     stat
        // }

    }

})


export const handleAddRoom = (data: any) => {
    return async (dispatch: AppDispatch) => {
        const addRoom = async () => {

            await addDoc(allRoomRef, data)
            dispatch(roomActions.addRoom(data as any))
            dispatch(roomActions.addToRoomList(data))
        }

        try {
            await addRoom()
        } catch (err) {
            console.log(err)
        }
    }
}


export const getAllRooms = () => {
    return async (dispatch: AppDispatch) => {
        const getRooms = async () => {
            const response = await getDocs(allRoomRef)
            const res = response.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id

            }))
            localStorage.setItem('allRoom', JSON.stringify(res as any))
            dispatch(roomActions.addToRoomList(res))
        }
        try {
            await getRooms()
        } catch (err) {
            console.log(err)
        }
    }

}


export const roomActions = RoomSlice.actions
export default RoomSlice.reducer