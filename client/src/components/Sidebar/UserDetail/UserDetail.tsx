import React, { useState, useEffect } from 'react'
import './UserDetail.css'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from '../../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import EditModal from '../../EditProfile/EditModal';
import { modalActions } from '../../../store/slice/modalSlice';
import { roomActions } from '../../../store/slice/roomSlice';

const UserDetail = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [openModal, setOpenModal] = useState(false)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  return (
    <div className='user-detail'>
      <div onClick={() => dispatch(roomActions.handleDefault())} className='user-image'>
        <Avatar src={user.photoUrl as string} sx={{ width: 56, height: 56 }}
        />

      </div>
      <div className={`${user.bio == '' ? 'user' : 'user-name'}`}>
        {user.name ? <span className='name'>{user.name} </span> : <span className='name' style={{ marginRight: '30px' }}>Hello, Guest </span>}

        {user.bio != '' && <span className='bio'>{user.bio}</span>}



      </div>
      <div className='user-edit'>
        {isAuthenticated == true && <EditIcon onClick={() => dispatch(modalActions.handleOpen())} style={{ fontSize: "19px", color: "gray" }} />
        }
        <EditModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>

    </div>
  )
}

export default UserDetail