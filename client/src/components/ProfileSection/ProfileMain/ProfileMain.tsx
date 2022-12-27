import React from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VideocamIcon from '@mui/icons-material/Videocam';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ProfileMain = () => {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div>
            <div className='profile-image'>
                <Avatar alt="Travis Howard" src={user.photoUrl as string} sx={{ width: 140, height: 140 }} />

            </div>
            <div className="profile-detail">
                <h2 className='profile-name'>{user.name}</h2>
                <h5 className='profile-bio'>{user.bio}</h5>


            </div>

            <div className='profile-connect-options'>
                <div className='profile-connect-sub1'>
                    <ChatBubbleIcon style={{ fontSize: "25px", color: "#007FFF" }} />

                </div>
                <Divider className='profile-divider' orientation="vertical" flexItem />


                <div className='profile-connect-sub2'>
                    <VideocamIcon style={{ fontSize: "30px", color: "#007FFF" }} />

                </div>
            </div>
        </div>
    )
}

export default ProfileMain