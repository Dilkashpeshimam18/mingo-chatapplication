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
            if (Array.isArray(action.payload)) {
                state.allMessages = action.payload

            } else {
                state.allMessages.push(action.payload)
                let jsonObject = state.allMessages.map((msg) => JSON.stringify(msg));
                let uniqueSet = new Set(jsonObject);
                state.allMessages = Array.from(uniqueSet).map((msg) => JSON.parse(msg));
            }
        },

    }
})

export const messageActions = MessageSlice.actions
export default MessageSlice.reducer