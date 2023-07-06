import React, { useState, useEffect } from 'react'
import './MainBody.css'
import Header from './MainBodyHeader/Header'
import Divider from '@mui/material/Divider';
import ChatSection from './MainBodySection/ChatSection';
import Footer from './MainBodyFooter/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { RoomType } from '../../store/slice/roomSlice';
import { socket } from '../../App';
import axios from 'axios';
import { messageActions } from '../../store/slice/messageSlice';

export type MessageProps = {
  id: string,
  username: string,
  image: string,
  message: string,
  email: string
}

const MainBody = () => {
  const [data, setData] = useState<RoomType[]>([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const user = useSelector((state: RootState) => state.auth.user)
  const allRoom = useSelector((state: RootState) => state.room.allRoom)
  const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
  const isRoom = useSelector((state: RootState) => state.room.isRoom)
  const selectedRoom = localStorage.getItem('room')
  const dispatch = useDispatch()

  const handleSendMessage = async () => {
    try {
      if (message != '') {
        let userMessage = {
          username: user.name as string,
          image: user.photoUrl as string,
          message: message as string,
          email: user.email as string,
        }
        const token = localStorage.getItem('userToken')

        let reqInstance = await axios.create({
          headers: {
            Authorization: token
          }
        })
        const response = await reqInstance.post('http://localhost:4000/message/add-message', userMessage)
        await getAllMessage()
      }
      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  const getAllMessage = async () => {
    try {
      let messages = [];
      const storedMessages = localStorage.getItem('allMessage');
      if (storedMessages) {
        messages = JSON.parse(storedMessages);
      }
     let lastMsgId;
      if (messages.length == 0) {
        lastMsgId = 0
      } else {
        lastMsgId = messages.length-1
      }
      console.log(lastMsgId)
      const res = await axios.get(`http://localhost:4000/message/get-messages?lastMsgId=${lastMsgId}`)
      let result = res.data.messages
      let data: any = result.map((message: object | any) => {
        return {
          id: message.id,
          username: message.username,
          image: message.photoUrl,
          message: message.message,
          email: message.email
        }
      })
      messages = [...messages, ...data]
      localStorage.setItem('allMessage', JSON.stringify(messages))
      dispatch(messageActions.handleAllMessage(messages))



    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMessage()
  }, [isSelectedRoom])

  // useEffect(() => {
  //   setInterval(() => {
  //     getAllMessage()
  //   }, 1000)
  // }, [])

  useEffect(() => {
    if (isRoom == true) {
      let selectedRoom = allRoom.filter((room) => {
        return room.roomName == isSelectedRoom
      })
      setData(selectedRoom)
      socket.emit("join_room", isSelectedRoom)

    }


  }, [isRoom, isSelectedRoom])



  return (
    <div className='mainbody'>
      <Header data={data} />
      <Divider variant='inset' />
      <ChatSection />
      <Divider variant='middle' />
      <Footer handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} setMessages={setMessages} getAllMessage={getAllMessage} />

    </div>
  )
}

export default MainBody