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
import { getAllRooms, roomActions } from '../../../store/slice/roomSlice';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const ProfileOptions = () => {
    const [data, setData] = useState<RoomType[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [userId, setUserId] = useState<string>(() => {
        return localStorage.getItem('userUID') || ''
    })
    const user = useSelector((state: RootState) => state.auth.user)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const allRoom = useSelector((state: RootState) => state.room.allRoom)
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
    const roomAdminId=useSelector((state:RootState)=>state.room.roomAdminId)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    // const userId = localStorage.getItem('userUID')

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

    const handleAddMember = () => {
        dispatch(modalActions.handleIsAddMember())
        dispatch(modalActions.handleOpen())

    }

    const handleLogout = async () => {
        try {
            alert('You are logout! Redirecting to login page.')
            dispatch(authActions.removeUserDetail())
            dispatch(roomActions.handleDefault())
            localStorage.removeItem('userName')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userUID')
            localStorage.removeItem('userToken')
            localStorage.removeItem('room')
            localStorage.removeItem('userBio')
            localStorage.removeItem('userPhotoUrl')
            localStorage.removeItem('roomId')
            localStorage.removeItem('allRoom')

            navigate('/login')

        } catch (err) {
            console.log(err)
        }
    }


    const handleDelete = async () => {
        try {
            let id = data[0]?.id
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.delete(`http://localhost:4000/room/delete-room/${id}`)
                .then(() => {
                    alert('Room Deleted!')
                    dispatch(roomActions.handleDefault())
                    dispatch(getAllRooms())

                })

        } catch (err) {
            console.log(err)

        }
    }

    return (
        <div className='profile-options'>

            <div className='profile-sub'>
                {isRoom == true && userId == roomAdminId && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'><GroupAddIcon style={{ fontSize: '23px', color: 'gray', paddingTop: '2px', paddingLeft: '5px' }} />
                    </span>
                    <p onClick={handleAddMember} className='profile-sub-text'>  Add Members</p>

                </div>}
                {isRoom == true && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'>
                        <PersonOutlineOutlinedIcon style={{ fontSize: '27px', color: 'gray' }} />
                    </span>
                    <p onClick={() => dispatch(memberActions.handleViewMember())} className='profile-sub-text'>   View Members</p>

                </div>}
                <div className='profile-sub-inner'>

                    {isRoom == true && userId == roomAdminId &&
                        <>
                            <span className='profile-sub-icon'><EditIcon style={{ fontSize: '21px', color: 'gray' }} />
                            </span>
                            <p onClick={handleEdit} className='profile-sub-text'>  Edit Room</p>

                        </>



                    }

                    {openModal == true && <RoomModal openModal={openModal} setOpenModal={setOpenModal} />}

                </div>
                {isRoom == true && userId == roomAdminId && <div className='profile-sub-inner'>
                    <span className='profile-sub-icon'><DeleteIcon style={{ fontSize: '21px', color: 'gray', paddingTop: '2px' }} />
                    </span>
                    <p onClick={handleDelete} className='profile-sub-text'>  Delete  Room</p>

                </div>}
                {isAuthenticated == true && <div className='profile-sub-inner'>

                    <span className='profile-sub-icon'>
                        <GroupAddOutlinedIcon style={{ fontSize: '25px', color: 'gray' }} />

                    </span>

                    <p onClick={() => setOpenModal(true)} className='profile-sub-text'>  Create Room</p>
                </div>}

                {userId ? <div onClick={handleLogout} className='profile-sub-inner'>
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