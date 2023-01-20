import { createSlice } from "@reduxjs/toolkit";

export type MessageProps = {
    id: string,
    username: string,
    image: string,
    message: string,
    email: string
}


type MessagesType = {
    allMessages: MessageProps[]
}
const initialMessagelState: MessagesType = {
    allMessages: []
}

const MessageSlice = createSlice({
    name: 'message',
    initialState: initialMessagelState,
    reducers: {
        handleAllMessage(state, action) {
            state.allMessages = action.payload
        },

    }
})

export const messageActions = MessageSlice.actions
export default MessageSlice.reducer