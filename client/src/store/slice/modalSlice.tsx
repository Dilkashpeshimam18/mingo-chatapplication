import { createSlice } from "@reduxjs/toolkit";


interface ModalType {
    isOpen: boolean
    isEditRoom: boolean
}
export const initialModalState: ModalType = {
    isOpen: false,
    isEditRoom: false
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        handleOpen(state) {
            state.isOpen = true
        },
        handleClose(state) {
            state.isOpen = false
            state.isEditRoom = false
        },
        handleIsEditRoom(state) {
            state.isEditRoom = true

        }
    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer