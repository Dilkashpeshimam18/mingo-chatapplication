import React from 'react'
import './Message.css'
import Avatar from '@mui/material/Avatar';

type MessageProps = {
    message: string,
    image: string,
    name: string
}

const Message = ({ message, image, name }: MessageProps) => {
    return (
        <div className='message-container '>
            <div className='message-avatar'>
                <Avatar alt="Travis Howard" src={image} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
                <span>{name}</span>
                <div className='message-body'>
                    <p>{message}</p>
                </div>
            </div>

        </div>
    )
}

export default Message