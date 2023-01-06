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
import { roomActions } from '../../../store/slice/roomSlice';

const MessageList = () => {
  const [open, setOpen] = useState(false)
  const allRoom = useSelector((state: RootState) => state.room.allRoom)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
  }
  const handleJoinRoom = (room: any) => {
    dispatch(roomActions.handleIsSelectedRoom(room))
  }

  return (
    <div className='message'>
      <div className='message-header'>
        <h3 className='message-title'>
          Messages
        </h3>
      </div>
      <div className='messageList'>
        <div className='messageList-container'>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor: 'pointer' }}>
            {allRoom.map((room) => {
              return (
                <>
                  <ListItem onClick={() => handleJoinRoom(room.roomName)} className='singleMessage-container' alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={room.roomUrl} sx={{ width: 45, height: 45 }} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={room.roomName}
                      sx={{ color: '#007FFF' }}

                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>


              )
            })}

          </List>

        </div>

      </div>

    </div>
  )
}

export default MessageList