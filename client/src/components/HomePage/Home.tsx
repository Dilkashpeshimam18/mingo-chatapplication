import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import MainBody from '../MainBody/MainBody'
import Profile from '../ProfileSection/Profile'

const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <MainBody />
            <Profile />
        </div>
    )
}

export default Home