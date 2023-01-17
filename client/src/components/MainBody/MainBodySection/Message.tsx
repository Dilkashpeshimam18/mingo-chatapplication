import React from 'react'
import './Message.css'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
type MessageProps = {
    message: string,
    image: string,
    name: string
}

const Message = ({ message, image, name }: MessageProps) => {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div className='message-container '>
            <div className='message-avatar'>
                <Avatar src={image == null ? user.photoUrl as string : image} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
                <div className='message-user'>
                    <span className='sender-name'>{name}</span>

                </div>
                <div className={user.name == name ? 'message-sender' : 'message-body'}>
                    <p>{message}</p>
                </div>
            </div>

        </div>
    )
}

export default Message