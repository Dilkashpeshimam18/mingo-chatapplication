import React, { useState, useEffect } from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VideocamIcon from '@mui/icons-material/Videocam';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { RoomType } from '../../../store/slice/roomSlice';
const ProfileMain = () => {
    const [data, setData] = useState<RoomType[]>([])
    const user = useSelector((state: RootState) => state.auth.user)
    const allRoom = useSelector((state: RootState) => state.room.allRoom)
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)

    useEffect(() => {
        if (isRoom == true) {
            let selectedRoom = allRoom.filter((room) => {
                return room.roomName == isSelectedRoom
            })
            setData(selectedRoom)
        }

    }, [isRoom, isSelectedRoom])
    return (
        <div>
            {isRoom == true && <>
                <div className='profile-image'>
                    <Avatar src={data[0]?.roomUrl as string} sx={{ width: 140, height: 140 }} />

                </div>
                <div className="profile-detail">
                    <h2 className='profile-name'>{data[0]?.roomName}</h2>


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
            </>}
            {isRoom == false &&
                <>
                    <div className='profile-image'>
                        <Avatar src={user.photoUrl as string} sx={{ width: 140, height: 140 }} />

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

                </>

            }
        </div>

    )
}

export default ProfileMain