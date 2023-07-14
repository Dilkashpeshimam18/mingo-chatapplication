import React, { useState, useEffect } from 'react'
import './AllMember.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
const AllMembers = () => {
    const roomId = useSelector((state: RootState) => state.room.roomId)

    const [allUser, setAllUser] = useState<object[]>([])

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
                                <div style={{ marginLeft: '10px' }}>
                                    <Avatar src={user.photoUrl} sx={{ width: 45, height: 45 }} />

                                </div>
                                <div style={{ paddingLeft: '10px', fontSize: '13px' }}>
                                    <p>{user.name}</p>

                                </div>
                                {
                                    user.isAdmin == true && <div style={{ paddingLeft: '30px', fontSize: '13px', paddingTop: '9px' }}>
                                        <button className='isAdmin__text'>Room Admin</button>

                                    </div>
                                }
                                {
                                    user.isAdmin == false && <div style={{ paddingLeft: '10px', fontSize: '13px' }}>
                                        <PersonRemoveIcon onClick={() => removeMember(user.id as string | any)} style={{ color: 'gray' }} />
                                    </div>
                                }


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