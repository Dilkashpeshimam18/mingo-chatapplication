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

  // let allMessageRef: any;
  // if (user.email != '') {
  //   allMessageRef = collection(collection(db, 'allMessage') as any, isSelectedRoom as string, isSelectedRoom as string)

  // } else {
  //   allMessageRef = collection(db, 'allMessage')
  // }
  const handleSendMessage = async () => {
    if (message != '') {
      // socket.emit("send_message", { message, isSelectedRoom })
      let userMessage = {
        username: user.name as string,
        image: user.photoUrl as string,
        message: message as string,
        email: user.email as string,
      }
      try {
        const response = await axios.post(`https://mingo-chatapp-default-rtdb.firebaseio.com/allMessage/${isSelectedRoom}.json`, userMessage)
          .then((res) => {
            getAllMessage()

          })

        // await addDoc(allMessageRef, userMessage)

      } catch (err) {
        console.log(err)
      }
    }

    setMessage('')
  }

  const getAllMessage = async () => {
    let data: any = []
    try {
      const response = await axios.get(`https://mingo-chatapp-default-rtdb.firebaseio.com/allMessage/${isSelectedRoom}.json`)
        .then((res) => {
          let result = res.data
          for (let key in result) {
            data.push({
              id: key,
              email: result[key].email,
              message: result[key].message,
              username: result[key].username,
              image: result[key].image
            })
          }

          dispatch(messageActions.handleAllMessage(data))

        })

      // const response = await getDocs(query(allMessageRef, orderBy('timestamp')))
      // const res = response.docs.map((doc) => {
      //   data.push(doc.data())
      // })


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMessage()
  }, [isSelectedRoom])



  useEffect(() => {
    if (isRoom == true) {
      let selectedRoom = allRoom.filter((room) => {
        return room.roomName == isSelectedRoom
      })
      setData(selectedRoom)
      socket.emit("join_room", isSelectedRoom)

    }


  }, [isRoom, isSelectedRoom])

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setReceivedMessage(data)
  //   })



  // }, [socket])

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