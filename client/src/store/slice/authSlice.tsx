import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type AuthType = {
    isAuthenticated: boolean,
    user: {
        name: string | null,
        email: string | null,
        photoUrl: string | null,
        bio: string | null,
        token: string | null,
        uid: string | null,

    },
    userbio:string,
    userphoto:string
}
let userDetail = localStorage.getItem('user')

const initialAuthState: AuthType = {
    isAuthenticated: localStorage.getItem('userName') ? true : false,

    user: {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        photoUrl: localStorage.getItem('userPhotoUrl') || '',
        bio: localStorage.getItem('userBio') || '',
        token: localStorage.getItem('token') || null,
        uid:localStorage.getItem('userId') || null
    },

    userbio:localStorage.getItem('userBio') || '',
    userphoto:localStorage.getItem('userPhotoUrl') || '',

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
            state.user.token = null
            state.user.uid=null
            state.isAuthenticated = false
            state.userbio=''
            state.userphoto=''


        },
        addUserInfo(state,action){
            state.userbio=action.payload.bio
            state.userphoto=action.payload.photoUrl
        }

    }
})

export const authActions = AuthSlice.actions
export default AuthSlice.reducer