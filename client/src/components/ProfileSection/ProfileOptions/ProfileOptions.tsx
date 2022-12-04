import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'

const ProfileOptions = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await signOut(auth).then((user) => {
                alert('You are logout! Redirecting to login page.')
                navigate('/login')
            })


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='profile-options'>

            <div className='profile-sub'>
                <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <GroupAddOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>  Create Room</p>


                </div>
                <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <PersonOutlineOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>   View Friends</p>

                </div>

                <div onClick={handleLogout} className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <LogoutOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>   Logout</p>


                </div>
            </div>
        </div>
    )
}

export default ProfileOptions