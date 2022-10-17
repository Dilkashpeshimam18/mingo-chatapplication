import React from 'react'
import './Header.css'
import Avatar from '@mui/material/Avatar';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const Header = () => {
    return (
        <div className='main-header'>
            <div className='header-left'>
                <div className='main-image'>
                    <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" sx={{ width: 50, height: 50 }} />

                </div>
                <div className='main-detail'>
                    <h2 className='main-name'>Suzi</h2>
                    <p className='main-mode'>online</p>
                </div>
            </div>
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