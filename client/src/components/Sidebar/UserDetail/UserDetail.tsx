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
import { authActions } from '../../../store/slice/authSlice';
import axios from 'axios';

const UserDetail = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [openModal, setOpenModal] = useState(false)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)

  const userBio = useSelector((state: RootState) => state.auth.userbio)
  const userPhoto = useSelector((state: RootState) => state.auth.userphoto)

  const dispatch = useDispatch()

  const handleEditProfile = () => {
    dispatch(modalActions.handleIsEditProfile())

    dispatch(modalActions.handleOpen())
  }

     const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })

            const res = await reqInstance.get('http://13.53.118.65:4000/user/get-singleUserInfo')
            const user = res.data.user
            localStorage.setItem('userBio', user.bio)
            localStorage.setItem('userPhotoUrl', user.photoUrl)

            dispatch(authActions.addUserInfo(user))


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
    if(isOpen==true){
      getUserInfo()
    }
    },[isOpen])

  return (
    <div className='user-detail'>
      <div onClick={() => dispatch(roomActions.handleDefault())} className='user-image'>
        <Avatar src={userPhoto as string} sx={{ width: 56, height: 56 }}
          className='user-avatar'
        />

      </div>
      <div className={`${userBio == '' ? 'user' : 'user-name'}`}>
        {user.name ? <span className='name'>{user.name} </span> : <span className='name' style={{ marginRight: '30px' }}>Hello, Guest </span>}

        {userBio != '' && <span className='bio'>{userBio}</span>}

      </div>
      <div className='user-edit'>
        {isAuthenticated == true && <EditIcon onClick={handleEditProfile} style={{ fontSize: "19px", color: "gray" }} />
        }
        <EditModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>

    </div>
  )
}

export default UserDetail