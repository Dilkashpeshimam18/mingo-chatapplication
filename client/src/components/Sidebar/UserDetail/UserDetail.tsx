import React, { useState, useEffect } from 'react'
import './UserDetail.css'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
const UserDetail = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className='user-detail'>
      <div className='user-image'>
        <Avatar alt="Travis Howard" src={user.photoUrl as any} sx={{ width: 56, height: 56 }}
        />

      </div>
      <div className={`${user.bio == '' ? 'user' : 'user-name'}`}>
        <span className='name'>{user.name} </span><br></br>
        {user.bio != '' && <span className='bio'>{user.bio}</span>}



      </div>
      <div className='user-edit'>
        <EditIcon style={{ fontSize: "19px", color: "gray" }} />

      </div>

    </div>
  )
}

export default UserDetail