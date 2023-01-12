import React, { useState, useEffect } from 'react'
import './MainBody.css'
import Header from './MainBodyHeader/Header'
import Divider from '@mui/material/Divider';
import ChatSection from './MainBodySection/ChatSection';
import Footer from './MainBodyFooter/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { RoomType } from '../../store/slice/roomSlice';
import { socket } from '../../App';
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase';


export type MessageProps = {
  username: string,
  image: string,
  message: string
}
const MainBody = () => {
  const [data, setData] = useState<RoomType[]>([])
  const [message, setMessage] = useState('')
  const [sender, setSender] = useState<boolean>(false)
  const [receiver, setReceiver] = useState<boolean>(false)
  const [messages, setMessages] = useState<string[]>([])
  const [receivedMessage, setReceivedMessage] = useState<string>('')
  const user = useSelector((state: RootState) => state.auth.user)
  const allRoom = useSelector((state: RootState) => state.room.allRoom)
  const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
  const isRoom = useSelector((state: RootState) => state.room.isRoom)
  const [allMessages, setAllMessage] = useState<MessageProps[]>([])



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

  const getAllMessage = async () => {
    // console.log(isSelectedRoom)
    let data: any = []

    try {
      const response = await getDocs(allMessageRef)
      const res = response.docs.map((doc) => {
        data.push(doc.data())
      })
      // console.log(res)
      // console.log(data)
      setAllMessage(data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMessage()
  }, [isSelectedRoom, handleSendMessage])

  useEffect(() => {
    if (isRoom == true) {
      let selectedRoom = allRoom.filter((room) => {
        return room.roomName == isSelectedRoom
      })
      setData(selectedRoom)
      socket.emit("join_room", isSelectedRoom)

    }


  }, [isRoom, isSelectedRoom])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data)
    })

  }, [socket])

  return (
    <div className='mainbody'>
      <Header data={data} />
      <Divider variant='inset' />
      <ChatSection allMessages={allMessages} messages={messages} receivedMessage={receivedMessage} />
      <Divider variant='middle' />

      <Footer handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} setMessages={setMessages} setSender={setSender} />

    </div>
  )
}

export default MainBody