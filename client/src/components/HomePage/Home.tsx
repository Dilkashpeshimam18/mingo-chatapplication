import React, { useEffect } from 'react'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import MainBody from '../MainBody/MainBody'
import Profile from '../ProfileSection/Profile'
import axios from 'axios'
import { authActions } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const res = await reqInstance.get('http://localhost:4000/user/get-singleUserInfo')
            const user = res.data.user
            localStorage.setItem('userBio', user.bio)
            localStorage.setItem('userPhotoUrl', user.photoUrl)

            dispatch(authActions.addUserInfo(user))


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className='home'>
            <Sidebar />
            <MainBody />
            <Profile />
        </div>
    )
}

export default Home