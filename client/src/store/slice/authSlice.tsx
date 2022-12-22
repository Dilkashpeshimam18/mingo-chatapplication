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
let userDetail = localStorage.getItem('user')

const initialAuthState: AuthType = {
    isAuthenticated: localStorage.getItem('userName') ? true : false,

    user: {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        photoUrl: localStorage.getItem('userPhotoUrl') || '',
        bio: localStorage.getItem('userBio') || '',
        uid: localStorage.getItem('userUID') || null
    }
}
const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        addUserDetail(state, action: PayloadAction<any>) {
            state.user = action.payload
            state.isAuthenticated = true
        },
        removeUserDetail(state) {
            state.user.name = ''
            state.user.email = ''
            state.user.photoUrl = ''
            state.user.bio = ''
            state.user.uid = null
            state.isAuthenticated = false


        }

    }
})

export const authActions = AuthSlice.actions
export default AuthSlice.reducer