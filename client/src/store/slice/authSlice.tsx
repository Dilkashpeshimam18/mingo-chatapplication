import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type AuthType = {
    isAuthenticated: boolean,
    user: {
        name: string | null,
        email: string | null,
        photoUrl: string | null,
        bio: string | null,
        uid: string | null,

    }
}

const initialAuthState: AuthType = {
    isAuthenticated: false,
    user: {
        name: '',
        email: '',
        photoUrl: '',
        bio: '',
        uid: null
    }
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        addUserDetail(state, action: PayloadAction<any>) {
            state.user = action.payload
            state.isAuthenticated = true
        }

    }
})

export const authActions = AuthSlice.actions
export default AuthSlice.reducer