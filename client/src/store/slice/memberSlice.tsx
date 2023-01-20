import { createSlice } from "@reduxjs/toolkit";

type MemberType = {
    isViewMember: boolean
}
const initialMemberState = {
    isViewMember: false
}

const MemberSlice = createSlice({
    name: 'member',
    initialState: initialMemberState,
    reducers: {
        handleViewMember(state) {
            state.isViewMember = true
        },
        isNotViewMember(state) {
            state.isViewMember = false
        }
    }
})

export const memberActions = MemberSlice.actions
export default MemberSlice.reducer