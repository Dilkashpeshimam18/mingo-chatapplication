import React, { useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase'
import RoomModal from '../../RoomModal/RoomModal';
import { authActions } from '../../../store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { modalActions } from '../../../store/slice/modalSlice';

const ProfileOptions = () => {
    const [openModal, setOpenModal] = useState(false)
    const user = useSelector((state: RootState) => state.auth.user)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleEdit = () => {
        dispatch(modalActions.handleIsEditRoom())

        dispatch(modalActions.handleOpen())
    }

    const handleLogout = async () => {
        try {
            await signOut(auth).then((user) => {
                alert('You are logout! Redirecting to login page.')
                dispatch(authActions.removeUserDetail())
                localStorage.removeItem('userName')
                localStorage.removeItem('userEmail')
                localStorage.removeItem('userPhotoUrl')
                localStorage.removeItem('userUID')
                navigate('/login')
            })


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='profile-options'>

            <div className='profile-sub'>
                <div className='profile-sub-inner'>

                    {isRoom == true ?
                        <>
                            <span className='profile-sub-icon'><EditIcon style={{ fontSize: '21px', color: 'gray' }} />
                            </span>
                            <p onClick={handleEdit} className='profile-sub-text'>  Edit Room</p> :

                        </> :
                        <>  <span className='profile-sub-icon'>
                            <GroupAddOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />

                        </span>

                            <p onClick={() => setOpenModal(true)} className='profile-sub-text'>  Create Room</p>
                        </>



                    }
                    {openModal == true && <RoomModal openModal={openModal} setOpenModal={setOpenModal} />}

                </div>
                {isRoom == true && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <PersonOutlineOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>   View Members</p>

                </div>}


                {user.uid ? <div onClick={handleLogout} className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <LogoutOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>   Logout</p>


                </div> : <Link style={{ textDecoration: 'none' }} to='/login'> <div className='profile-sub-inner'>

                    <span className='profile-sub-icon'>
                        <LoginIcon style={{ fontSize: '25px', color: 'gray' }} />
                    </span>
                    <p className='profile-sub-text'>  Login</p>

                </div>                    </Link>
                }

            </div>
        </div>
    )
}

export default ProfileOptions