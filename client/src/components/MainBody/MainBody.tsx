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
import { do_Decrypt, do_Encrypt } from '../../crypto'

export type MessageProps = {
  id: string,
  username: string,
  image: string,
  message: string,
  email: string
}
interface ExtendedFile extends File {
  [key: string]: any;
}
const MainBody = () => {
  const [data, setData] = useState<RoomType[]>([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const user = useSelector((state: RootState) => state.auth.user)
  const allRoom = useSelector((state: RootState) => state.room.allRoom)
  const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
  const isRoom = useSelector((state: RootState) => state.room.isRoom)
  const roomId = useSelector((state: RootState) => state.room.roomId)
  const [selectedFile, setSelectedFile] = useState<File | null | undefined | ExtendedFile>(null);
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch()
  let messagesReceived = false;

  // Update the formData object
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined = e.target.files?.[0];
    if (file) {
      handleUpload(file)
    }
  };


  const handleUpload = async (file: File | undefined | null) => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const token = localStorage.getItem('userToken')

      let reqIns = await axios.create({
        headers: {
          Authorization: token,
        }
      })

      let userMessage = {
        username: user.name as string,
        image: user.photoUrl as string,
        message: '',
        email: user.email as string,
        files: '',
        roomId,
      }

      const fileRes = await reqIns.post('http://13.53.118.65:4000/message/store-files', userMessage)

      const msgId = fileRes.data.messageId

      let reqInstance = await axios.create({
        headers: {
          Authorization: token,
          'content-type': file.type,
        }
      })

      const formData = new FormData();
      formData.append('file', file);


      const res = await reqInstance.post(`http://13.53.118.65:4000/message/upload-files/${roomId}/${msgId}`, formData)
      getAllMessage();


    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };



  const handleSendMessage = async () => {
    messagesReceived = false

    try {
      if (message != '') {
        messagesReceived = false
        const ans = do_Encrypt(message as string);

        let userMessage = {
          username: user.name as string,
          image: user.photoUrl as string,
          message: ans as string,
          email: user.email as string,
          roomId,
          files: ""
        }
        const room = roomId
        await socket.emit('send-message', userMessage, room, async (message: any) => {
          let userMsg = {
            username: message.username,
            email: message.email,
            image: message.image,
            message: do_Decrypt(message.message),
            roomId: message.roomId
          }
          await dispatch(messageActions.handleAllMessage(userMsg))

        })
        const token = localStorage.getItem('userToken')

        let reqInstance = await axios.create({
          headers: {
            Authorization: token
          }
        })


        const response = await reqInstance.post('http://13.53.118.65:4000/message/add-message', userMessage)

        getMessagesBySocket(() => {
          if (!messagesReceived) {
            getAllMessage();
          }
        })
      }

      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }



  const getMessagesBySocket = (callback: any) => {
    socket.on('receive-message', (message) => {
      let userMsg: any = {
        username: message.username,
        email: message.email,
        image: message.image,
        message: do_Decrypt(message.message),
        roomId: message.roomId
      }
      dispatch(messageActions.handleAllMessage(userMsg));
      messagesReceived = true

      callback()
    });

  };

  const getAllMessage = async () => {
    try {
      //   let messages = [];
      //   const storedMessages = localStorage.getItem('allMessage');
      //   if (storedMessages) {
      //     messages = JSON.parse(storedMessages);
      //   }
      //  let lastMsgId;
      //   if (messages.length == 0) {
      //     lastMsgId = 0
      //   } else {
      //     lastMsgId = messages.length-1
      //   }
      // const res = await axios.get(`http://13.53.118.65:4000/message/get-messages?lastMsgId=${lastMsgId}`)

      const id = roomId
      const res = await axios.get(`http://13.53.118.65:4000/message/get-messages/${id}`)
      let result = res.data.messages
      let data: any = result.map((message: object | any) => {
        const decrypt_message = do_Decrypt(message.message)
        return {
          id: message.id,
          username: message.username,
          image: message.photoUrl,
          message: decrypt_message,
          email: message.email,
          fileUrl: message.files
        }
      })

      // messages = [...messages, ...data]
      // localStorage.setItem('allMessage', JSON.stringify(messages))
      dispatch(messageActions.handleAllMessage(data))



    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (isRoom == true) {
      let selectedRoom = allRoom.filter((room) => {
        return room.roomName == isSelectedRoom
      })
      setData(selectedRoom)

    }
  }, [isRoom, isSelectedRoom])



  useEffect(() => {
    getAllMessage()
  }, [isSelectedRoom])


  return (
    <div className='mainbody'>
      <Header data={data} />
      <Divider variant='inset' />
      <ChatSection />
      <Divider variant='middle' />
      {isSelectedRoom != 'Default' &&
        <Footer handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} setMessages={setMessages} getAllMessage={getAllMessage} handleFileChange={handleFileChange} fileName={fileName} />

      }

    </div>
  )
}

export default MainBody