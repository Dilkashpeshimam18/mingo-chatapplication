import React, { useState } from 'react'
import './ChatSection.css'
import Message from './Message'

interface ChatSectionProps {
  messages: string[],
  receivedMessage: string
}
const ChatSection = ({ messages, receivedMessage }: ChatSectionProps) => {
  return (
    <div className='chat-body'>
      <div className='chat-section'>
        {/* {messages.map((message) => {
          return (

            <Message message={message} />


          )
        })} */}
        <Message message={receivedMessage} />

      </div>
    </div>
  )
}

export default ChatSection