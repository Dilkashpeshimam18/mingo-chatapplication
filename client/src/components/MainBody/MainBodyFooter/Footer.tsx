import React from 'react'
import './Footer.css'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    return (
        <div className='main-footer'>
            <div className='chat-footer'>
                <div className='footer-left'>
                    <div className='footer-icon'>
                        <MicNoneOutlinedIcon className='footer-mic' sx={{ width: 23, height: 23, color: 'gray', cursor: 'pointer' }} />

                    </div>
                    <div className='input-container'>
                        <input className='chat-input' placeholder='Write a message...' />

                    </div>

                </div>
                <div className='footer-right'>
                    <div className='footer-icons'>
                        <AttachmentOutlinedIcon sx={{ width: 23, height: 23, color: 'gray', cursor: 'pointer' }} />

                    </div>
                    <div className='footer-icons'>
                        <EmojiEmotionsOutlinedIcon sx={{ width: 23, height: 23, color: 'gray', cursor: 'pointer' }} />

                    </div>
                    <div className='footer-icons'>
                        <CameraAltOutlinedIcon sx={{ width: 23, height: 23, color: 'gray', cursor: 'pointer' }} />

                    </div>
                    <div className='footer-icons footer-send'>
                        <SendIcon className='send-icon' sx={{ width: 19, height: 19, color: 'white', cursor: 'pointer' }} />

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer