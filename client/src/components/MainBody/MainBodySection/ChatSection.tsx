import React, { useEffect } from 'react'
import './ChatSection.css'
import Message from './Message'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Avatar from '@mui/material/Avatar';


const ChatSection = () => {
  const allMessage = useSelector((state: RootState) => state.message.allMessages)
  const user = useSelector((state: RootState) => state.auth.user)

  const renderFilePreview = (fileUrl: string, name: string, image: string, email: string) => {
    const fileType = fileUrl?.split('.').pop()?.toLowerCase();

    if (fileType) {
      if (['png', 'jpg', 'jpeg', 'gif','avif','webp'].includes(fileType)) {
        return (
          <div className='message--container '>
            <div className='message--avatar'>
              <Avatar src={image == null ? (
                user.email == email ? user.photoUrl as string : image
              ) : (image)} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
              <div className='message-user'>
                <span className='sender-name'>{name}</span>

              </div>
              <div >
                <img style={{ borderRadius: '5px', marginTop: '3px' }} src={fileUrl} alt="Uploaded file" width="200" height="140" />;
              </div>
            </div>

          </div>)
      } else if (fileType === 'mp4') {
        return (
          <div className='message--container '>
            <div className='message--avatar'>
              <Avatar src={image == null ? (
                user.email == email ? user.photoUrl as string : image
              ) : (image)} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
              <div className='message-user'>
                <span className='sender-name'>{name}</span>

              </div>
              <div >
                <video style={{ borderRadius: '5px', marginTop: '3px' }} controls src={fileUrl} width="200" height="150" />;
              </div>
            </div>

          </div>)
      } else if (fileType === 'pdf') {
        return (
          <div className='message--container '>
            <div className='message--avatar'>
              <Avatar src={image == null ? (
                user.email == email ? user.photoUrl as string : image
              ) : (image)} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
              <div className='message-user'>
                <span className='sender-name'>{name}</span>

              </div>
              <div className={user.name == name ? 'message-sender' : 'message-body'} >
                <p>Pdf file downloaded</p>
                <embed style={{ borderRadius: '5px', marginTop: '3px' }} src={fileUrl} width="120" height="3px" type="application/pdf" />              </div>
            </div>

          </div>
        );
      } else {
        return (
          <div className='message--container '>
            <div className='message--avatar'>
              <Avatar src={image == null ? (
                user.email == email ? user.photoUrl as string : image
              ) : (image)} sx={{ width: 45, height: 45 }} />
            </div>
            <div className='message-subContainer '>
              <div className='message-user'>
                <span className='sender-name'>{name}</span>

              </div>
              <div >
                <p style={{fontSize:'smaller'}}>Unsupported file type: {fileType}</p>              </div>
            </div>

          </div>
        );
      }
    } else {
      return null; // or return a fallback UI if fileUrl is undefined
    }
  };
  return (
    <div className='chat-body'>
      <div className='chat-section'>
        {allMessage?.map((message, index) => {
          if (!message.message && message.fileUrl !== '') {
            // Show only the file preview if message is empty and files contain a URL
            return renderFilePreview(message.fileUrl as string, message.username as string, message.image as string, message.email as string);
          } else {
            // Show the entire Message component for other cases
            return (
              <Message
                key={index}
                message={message.message}
                image={message.image}
                name={message.username}
                email={message.email}
              />
            );
          }
        })}

      </div>
    </div>
  )
}


export default ChatSection