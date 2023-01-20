import React, { useState, useEffect } from 'react'
import './Footer.css'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';


type FooterProps = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
    setMessages: React.Dispatch<React.SetStateAction<string[]>>,
    handleSendMessage: () => void,
    getAllMessage: () => void
}

const Footer = ({ message, setMessage, setMessages, handleSendMessage, getAllMessage }: FooterProps) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [isEmoji, setIsEmoji] = useState(false)


    return (
        <div className='main-footer'>
            <div className='chat-footer'>
                <div className='footer-left'>
                    <div className='footer-icon'>
                        <MicNoneOutlinedIcon className='footer-mic' sx={{ width: 23, height: 23, color: 'gray', cursor: 'pointer' }} />

                    </div>
                    <div className='input-container'>

                        <input value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className='chat-input' placeholder='Write a message...' />

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
                    <div onClick={handleSendMessage} className='footer-icons footer-send'>
                        <SendIcon className='send-icon' sx={{ width: 19, height: 19, color: 'white', cursor: 'pointer' }} />

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer