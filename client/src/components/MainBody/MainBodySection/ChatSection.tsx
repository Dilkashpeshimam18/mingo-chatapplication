import React,{useState} from 'react'
import './ChatSection.css'
import Message from './Message'

const ChatSection = () => {
  const [sender,setSender]=useState<boolean>(true)
  const [receiver,setReceiver]=useState<boolean>(true)
  return (
    <div className='chat-body'>

    <div className='chat-section'>
        <Message />
        <Message />
        <Message />
        <Message />



      </div>

    </div>
  )
}

export default ChatSection