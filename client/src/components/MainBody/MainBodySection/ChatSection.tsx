import React, { useState, useEffect } from 'react'
import './ChatSection.css'
import Message from './Message'
import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { db } from '../../../firebase/firebase';

interface ChatSectionProps {
  messages: string[],
  receivedMessage: string
}
let data: any = []
type MessageProps = {
  username: string,
  image: string,
  message: string
}
const ChatSection = ({ messages, receivedMessage }: ChatSectionProps) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
  const [allMessages, setAllMessage] = useState<MessageProps[]>([])
  let allMessageRef: any;
  if (user.email != '') {
    allMessageRef = collection(collection(db, 'allMessage') as any, isSelectedRoom as string, isSelectedRoom as string)

  } else {
    allMessageRef = collection(db, 'allMessage')

  }


  const getAllMessage = async () => {
    try {
      const response = await getDocs(allMessageRef)
      const res = response.docs.map((doc) => {
        data.push(doc.data())
      })
      console.log(res)
      console.log(data)
      setAllMessage(data)



    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMessage()
  }, [])
  return (
    <div className='chat-body'>
      <div className='chat-section'>
        {allMessages.map((message) => {
          return (

            <Message message={message.message} image={message.image} name={message.username} />


          )
        })}
        {/* <Message message={receivedMessage} /> */}

      </div>
    </div>
  )
}


export default ChatSection