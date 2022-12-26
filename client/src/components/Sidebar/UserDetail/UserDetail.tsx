import React, { useState, useEffect } from 'react'
import './UserDetail.css'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import EditModal from '../../EditProfile/EditModal';

const UserDetail = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [openModal, setOpenModal] = useState(false)


  return (
    <div className='user-detail'>
      <div className='user-image'>
        <Avatar src={user.photoUrl as string} sx={{ width: 56, height: 56 }}
        />

      </div>
      <div className={`${user.bio == '' ? 'user' : 'user-name'}`}>
        {user.name ? <span className='name'>{user.name} </span> : <span className='name' style={{ marginRight: '30px' }}>Hello, Guest </span>}

        {user.bio != '' && <span className='bio'>{user.bio}</span>}



      </div>
      <div className='user-edit'>
        <EditIcon onClick={() => setOpenModal(true)} style={{ fontSize: "19px", color: "gray" }} />
        <EditModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>

    </div>
  )
}

export default UserDetail