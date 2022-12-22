import React, { useState, useEffect } from 'react'
import './UserDetail.css'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from '../../../firebase/firebase';


const UserDetail = () => {
  const [name, setName] = useState<string | null>('')
  const [bio, setBio] = useState<string | null>('')
  // const [photoUrl, setPhotoUrl] = useState<string | undefined>('')
  const user = auth.currentUser
  let photoUrl;
  useEffect(() => {
    if (user !== null) {
      console.log(user)
      let userName = user.displayName
      photoUrl = user.photoURL;

      setName(userName)
      // setPhotoUrl(photoURL)
    }
  }, [user])

  return (
    <div className='user-detail'>
      <div className='user-image'>
        <Avatar alt="Travis Howard" src={photoUrl} sx={{ width: 56, height: 56 }}
        />

      </div>
      <div className='user-name'>
        <span className='name'>{name} </span><br></br>
        <span className='bio'>Senior Developer</span>

      </div>
      <div className='user-edit'>
        <EditIcon style={{ fontSize: "19px", color: "gray" }} />

      </div>

    </div>
  )
}

export default UserDetail