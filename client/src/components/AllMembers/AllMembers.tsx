import React, { useState, useEffect } from 'react'
import './AllMember.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { RoomType, getAllRooms } from '../../store/slice/roomSlice';
const AllMembers = () => {
    const roomId = useSelector((state: RootState) => state.room.roomId)

    const [allUser, setAllUser] = useState<object[]>([])
    const [userId, setUserId] = useState<string>(() => {
        return localStorage.getItem('userUID') || ''
    })
    const [adminId, setAdminId] = useState<string>('')
    const [data, setData] = useState<RoomType[]>([])
    const allRoom = useSelector((state: RootState) => state.room.allRoom)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (isRoom == true) {
            let selectedRoom = allRoom.filter((room) => {
                return room.roomName == isSelectedRoom
            })
            setData(selectedRoom)

        }

    }, [isRoom, isSelectedRoom])

    const getMemberOfRoom = async () => {
        try {
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const res = await reqInstance.get(`http://localhost:4000/member/get-member/${roomId}`)
            const user = res.data.data
            setAllUser(user)

            const admin = user.filter((user: object | any) => {
                return user.isAdmin == true

            })

            const AdminId = admin[0].userId

            setAdminId(AdminId)

        } catch (err) {
            console.log(err)
        }
    }

    const removeMember = async (memberId: string | any) => {
        try {
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const res = await reqInstance.delete(`http://localhost:4000/member/remove-member/${roomId}/${memberId}`)

            getMemberOfRoom()
            dispatch(getAllRooms())



        } catch (err) {
            console.log(err)
        }
    }
    const changeAdmin = async (userid: string) => {
        try {
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const res = await reqInstance.put(`http://localhost:4000/room/change-room-admin/${roomId}/${userid}`)
            await dispatch(getAllRooms()).then(() => {
                getMemberOfRoom()
                dispatch(getAllRooms())


            })

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMemberOfRoom()
    }, [])
    return (
        <div className='allMember'>AllMembers

            <div className='allMessage__container'>
                {allUser.length != 0 && allUser.map((user: any) => {
                    return (
                        <>
                            <div className='allUser'>
                                <div className='allUser__container1'>
                                    <div style={{ marginLeft: '10px' }}>
                                        <Avatar src={user.photoUrl} sx={{ width: 45, height: 45 }} />

                                    </div>
                                    <div style={{ paddingLeft: '10px', fontSize: '13px' }}>
                                        <p>{user.name}</p>

                                    </div>
                                </div>
                                <div className='allUser__container2'>
                                    {
                                        user.isAdmin == true && <div style={{ fontSize: '13px', paddingTop: '9px', marginRight: '32px' }}>
                                            <button className='isAdmin__text'>Room Admin</button>

                                        </div>
                                    }
                                    {
                                        userId == adminId && (
                                            user.isAdmin == false && <div style={{ paddingLeft: '10px', fontSize: '13px', display: 'flex' }}>
                                                <button style={{ marginRight: '10px', marginTop: '10px' }} onClick={() => changeAdmin(user.userId)} className='isAdmin__text'>Make Admin</button>
                                                <div style={{ paddingTop: '5px' }}>
                                                    <PersonRemoveIcon onClick={() => removeMember(user.id as string | any)} style={{ color: 'gray' }} />

                                                </div>

                                            </div>
                                        )
                                    }

                                </div>


                            </div>
                            <Divider />

                        </>


                    )
                })}
                {allUser.length == 0 && <p>No member yet!</p>}
            </div>
        </div>
    )
}

export default AllMembers