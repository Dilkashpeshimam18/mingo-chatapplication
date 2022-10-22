import React from 'react'
import './Message.css'
import Avatar from '@mui/material/Avatar';

const Message = () => {


    return (
        <div className='message-container '>
            <div className='message-avatar'>
                <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-body'>
                <p>Hello! How are you?</p>
            </div>
        </div>
    )
}

export default Message