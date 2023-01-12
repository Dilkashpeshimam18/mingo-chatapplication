import React, { useState } from 'react'
import './Footer.css'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../../App';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { db } from '../../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore'

type FooterProps = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
    setSender: React.Dispatch<React.SetStateAction<boolean>>,
    setMessages: React.Dispatch<React.SetStateAction<string[]>>
}

const Footer = ({ message, setMessage, setSender, setMessages }: FooterProps) => {
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
    const user = useSelector((state: RootState) => state.auth.user)

    let allMessageRef: any;
    if (user.email != '') {
        allMessageRef = collection(collection(db, 'allMessage') as any, isSelectedRoom as string, isSelectedRoom as string)

    } else {
        allMessageRef = collection(db, 'allMessage')
    }
    const handleSendMessage = async () => {
        if (message != '') {
            socket.emit("send_message", { message, isSelectedRoom })
            setSender(true)
            let userMessage = {
                username: user.name as string,
                image: user.photoUrl as string,
                message: message as string
            }
            console.log(userMessage)
            try {
                await addDoc(allMessageRef, userMessage)

            } catch (err) {
                console.log(err)
            }




        }
        setMessage('')
    }
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