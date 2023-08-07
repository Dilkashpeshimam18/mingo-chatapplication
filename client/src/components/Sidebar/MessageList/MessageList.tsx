import React, { useEffect, useState } from 'react'
import './MessageList.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { roomActions, getAllRooms } from '../../../store/slice/roomSlice';
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../firebase/firebase';
import { AppDispatch } from '../../../store/store';
import { memberActions } from '../../../store/slice/memberSlice';
import { socket } from '../../../App';

const MessageList = () => {
  const [open, setOpen] = useState(false)
  const allRoom = useSelector((state: RootState) => state.room.allRoom)
  const dispatch: AppDispatch = useDispatch()
  let allRoomRef = collection(db, 'allRoom')

  const handleClose = () => {
    setOpen(false)
  }
  const handleJoinRoom = (room: string, roomId: string,roomUrl:string,roomAdminId:string) => {
    const data = {
      room,
      roomId,
      roomUrl,
      roomAdminId
    }
    socket.emit('join-room',data)
    dispatch(roomActions.handleIsSelectedRoom(data as any))
    localStorage.setItem('room', room as string)
    localStorage.setItem('roomId', roomId as string)
    dispatch(memberActions.isNotViewMember())
  }


  useEffect(() => {
    dispatch(getAllRooms())
  }, [])

  return (
    <div className='message'>
      <div className='message-header'>
        <h3 className='message-title'>
          Rooms
        </h3>
      </div>
      <div className='messageList'>
        <div className='messageList-container'>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}>
            {allRoom.map((room, index) => {
              return (
                <div key={index}>
                  <ListItem onClick={() => handleJoinRoom(room.roomName as string, room.id as string,room.roomUrl as string,room.userId as string)} className='singleMessage-container' alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={room.roomUrl} sx={{ width: 45, height: 45 }} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={room.roomName}
                      sx={{ color: '#007FFF', paddingTop: '8px' }}

                    // secondary={
                    //   <React.Fragment>
                    //     <Typography
                    //       sx={{ display: 'inline' }}
                    
                    //       component="span"
                    //       variant="body2"
                    //       color="text.primary"
                    //     >
                    //       Ali Connors
                    //     </Typography>
                    //     {" — I'll be in your neighborhood doing errands this…"}
                    //   </React.Fragment>
                    // }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>


              )
            })}

          </List>

        </div>

      </div>

    </div>
  )
}

export default MessageList