import React, { useState, useEffect } from 'react'
import './ChatSection.css'
import Message from './Message'
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { db } from '../../../firebase/firebase';
import { MessageProps } from '../MainBody';

interface ChatSectionProps {

  allMessages: MessageProps[]
}

const ChatSection = ({ allMessages }: ChatSectionProps) => {
  return (
    <div className='chat-body'>
      <div className='chat-section'>
        {allMessages?.map((message) => {
          return (

            <Message message={message.message} image={message.image} name={message.username} email={message.email} />


          )
        })}
        {/* <Message message={receivedMessage} /> */}

      </div>
    </div>
  )
}


export default ChatSection