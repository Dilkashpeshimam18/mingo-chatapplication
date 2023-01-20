import React, { useState, useEffect } from 'react'
import './AllMember.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

const AllMembers = () => {
    const allMessage = useSelector((state: RootState) => state.message.allMessages)
    const objectsMap = new Map();
    let allUser: any = []
    allMessage.forEach((object) => {
        objectsMap.set(object.username
            , object);
    });
    objectsMap.forEach((object) => {

        allUser.push({ name: object.username, image: object.image })

    })

    return (
        <div className='allMember'>AllMembers

            <div className='allMessage__container'>
                {allUser.length != 0 && allUser.map((user: any) => {
                    return (
                        <>
                            <div className='allUser'>
                                <div style={{ marginLeft: '10px' }}>
                                    <Avatar src={user.image} sx={{ width: 45, height: 45 }} />

                                </div>
                                <div style={{ paddingLeft: '10px', fontSize: '13px' }}>
                                    <p>{user.name}</p>

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