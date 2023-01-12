import { createSlice } from "@reduxjs/toolkit";


interface ModalType {
    isOpen: boolean
}
const initialModalState: ModalType = {
    isOpen: false
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        handleOpen(state) {
            state.isOpen = true
        },
        handleClose(state) {
            state.isOpen = true
        }
    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer