import React from 'react'
import './Header.css'
import Avatar from '@mui/material/Avatar';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { RoomType } from '../../../store/slice/roomSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
type HeaderProps = {
    data: RoomType[]
}
const Header = ({ data }: HeaderProps) => {
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    return (
        <div className='main-header'>
            {isRoom == false && <>
                <div className='header-left'>
                    <div className='main-image'>
                        <Avatar alt="Travis Howard" sx={{ width: 50, height: 50 }} />

                    </div>
                    <div className='main-detail'>
                        <h2 className='main-name'>Default</h2>
                    </div>
                </div>
            </>}
            {isRoom == true && <>
                <div className='header-left'>
                    <div className='main-image'>
                        <Avatar alt="Travis Howard" src={data[0]?.roomUrl} sx={{ width: 50, height: 50 }} />

                    </div>
                    <div className='main-detail'>
                        <h2 className='main-name'>{data[0]?.roomName}</h2>
                        <p className='main-mode'>online</p>
                    </div>
                </div>
            </>}

            <div className='header-right'>
                <div className='main-option'>
                    <div className="options-icon">
                        <VideocamOutlinedIcon sx={{ width: 25, height: 25, color: 'gray', cursor: 'pointer' }} /></div>
                    <div className="options-icon">
                        <PhoneOutlinedIcon sx={{ width: 25, height: 25, color: 'gray', cursor: 'pointer' }} />
                    </div>
                    <div className="options-icon">
                        <MoreHorizOutlinedIcon sx={{ width: 25, height: 25, color: 'gray', cursor: 'pointer' }} />
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Header