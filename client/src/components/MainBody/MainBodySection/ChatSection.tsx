import React, { useEffect } from 'react'
import './ChatSection.css'
import Message from './Message'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';



const ChatSection = () => {
  const allMessage = useSelector((state: RootState) => state.message.allMessages)


  return (
    <div className='chat-body'>
      <div className='chat-section'>
        {allMessage?.map((message, index) => {
          return (
            <Message key={index} message={message.message} image={message.image} name={message.username} email={message.email} />
          )
        })}

      </div>
    </div>
  )
}


export default ChatSection