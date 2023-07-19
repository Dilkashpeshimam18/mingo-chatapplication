import { createSlice } from "@reduxjs/toolkit";


interface ModalType {
    isOpen: boolean
    isEditRoom: boolean,
    isAddMember:boolean,
    isEditProfile:boolean
}
export const initialModalState: ModalType = {
    isOpen: false,
    isEditRoom: false,
    isAddMember:false,
    isEditProfile:false
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
            state.isAddMember=false
            state.isEditProfile=false
        },
        handleIsEditRoom(state) {
            state.isEditRoom = true

        },
        handleIsAddMember(state){
            state.isAddMember=true
        },
        handleIsEditProfile(state) {
            state.isEditProfile = true

        },
    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer