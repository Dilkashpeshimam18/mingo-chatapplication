import React from 'react'
import './MessageList.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const MessageList = () => {
  return (
    <div className='message'>
         <div className='message-header'>
        <h3 className='message-title'>
            Messages
        </h3>
        </div>
        <div className='messageList'>
        <div className='messageList-container'>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', cursor:'pointer'}}>
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="Suzi"
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
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="Max"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"

              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="Ray"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="Stuart"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="John"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className='singleMessage-container' alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"   sx={{ width: 45, height: 45 }}/> 
        </ListItemAvatar>
        <ListItemText
          primary="Andrena"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>

     </div>

        </div>
  
    

        {/* <div className='messageList-container'>
          <div className='singleMessage-container'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"   sx={{ width: 45, height: 45 }}/> 
        <div className='messageList-body'>
          <p>Max</p>
          <p>Hello</p>

        </div>
        <div className='message-timestamp'>
              10:42 pm
        </div>
          </div>
          <div className='singleMessage-container'>
          <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"   sx={{ width: 45, height: 45 }}/> 
        <div className='messageList-body'>
          <p>Max</p>
          <p>Hello</p>

        </div>
        <div className='message-timestamp'>
              10:42 pm
        </div>
          </div>
      
        </div> */}

    </div>
  )
}

export default MessageList