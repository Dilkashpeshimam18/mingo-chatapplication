import React, { useState, useEffect } from 'react'
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
import { RootState, AppDispatch } from '../../../store/store';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { modalActions } from '../../../store/slice/modalSlice';
import { RoomType } from '../../../store/slice/roomSlice';
import { memberActions } from '../../../store/slice/memberSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getAllRooms } from '../../../store/slice/roomSlice';

const ProfileOptions = () => {
    const [data, setData] = useState<RoomType[]>([])
    const [openModal, setOpenModal] = useState(false)
    const user = useSelector((state: RootState) => state.auth.user)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const allRoom = useSelector((state: RootState) => state.room.allRoom)
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isRoom == true) {
            let selectedRoom = allRoom.filter((room) => {
                return room.roomName == isSelectedRoom
            })
            setData(selectedRoom)

        }

    }, [isRoom, isSelectedRoom])

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

    const handleDelete = async () => {
        try {
            let id = data[0]?.id
            console.log(id)
            const response = await axios.delete(`https://mingo-chatapp-default-rtdb.firebaseio.com/allroom/${id}.json`)
                .then(() => {
                    alert('Room Deleted!')
                    dispatch(getAllRooms())

                })

        } catch (err) {
            console.log(err)

        }
    }


    return (
        <div className='profile-options'>

            <div className='profile-sub'>
                <div className='profile-sub-inner'>

                    {isRoom == true && user.email == data[0]?.createdBy ?
                        <>
                            <span className='profile-sub-icon'><EditIcon style={{ fontSize: '21px', color: 'gray' }} />
                            </span>
                            <p onClick={handleEdit} className='profile-sub-text'>  Edit Room</p> :

                        </> :
                        <>
                            {isAuthenticated == true && <>

                                <span className='profile-sub-icon'>
                                    <GroupAddOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />

                                </span>

                                <p onClick={() => setOpenModal(true)} className='profile-sub-text'>  Create Room</p>
                            </>}

                        </>



                    }
                    {openModal == true && <RoomModal openModal={openModal} setOpenModal={setOpenModal} />}

                </div>
                {isRoom == true && user.email == data[0]?.createdBy && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'><DeleteIcon style={{ fontSize: '21px', color: 'gray', paddingTop: '2px' }} />
                    </span>
                    <p onClick={handleDelete} className='profile-sub-text'>  Delete  Room</p>

                </div>}
                {isRoom == true && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <PersonOutlineOutlinedIcon style={{ fontSize: '27px', color: 'gray' }} />
                    </span>
                    <p onClick={() => dispatch(memberActions.handleViewMember())} className='profile-sub-text'>   View Members</p>

                </div>}


                {user.token? <div onClick={handleLogout} className='profile-sub-inner'>
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