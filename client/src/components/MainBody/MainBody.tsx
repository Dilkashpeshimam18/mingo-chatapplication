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
  console.log(receivedMessage)
  return (
    <div className='mainbody'>
      <Header data={data} />
      <Divider variant='inset' />
      <ChatSection messages={messages} receivedMessage={receivedMessage} />
      <Divider variant='middle' />

      <Footer message={message} setMessage={setMessage} setMessages={setMessages} setSender={setSender} />

    </div>
  )
}

export default MainBody