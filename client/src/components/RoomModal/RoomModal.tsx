import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { getAllRooms } from '../../store/slice/roomSlice';
import { db } from '../../firebase/firebase';
import { collection, addDoc, doc, getDocs } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import axios from 'axios';

type RoomModalProps = {
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void
}

const RoomModal = ({ openModal, setOpenModal }: RoomModalProps) => {
    const [roomName, setRoomName] = useState<string | number>('')
    const [roomUrl, setRoomUrl] = useState<string>('')
    const [allRoom, setAllRoom] = useState([])
    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch: AppDispatch = useDispatch()
    let allRoomRef: any;
    if (roomName) {

        allRoomRef = collection(db, 'allRoom')

    }

    const token = localStorage.getItem('userToken')


    const handleModalClose = () => {
        setOpenModal(false)
    }

    const handleAddRoom = async (name: string, email: string, photoUrl: string) => {
        try {


            let room = {
                roomName: roomName,
                roomUrl: roomUrl,
            }


            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.post('http://localhost:4000/room/create-room', room)

            const roomId = response.data.message.id
            const data = {
                name,
                email,
                photoUrl,
                isAdmin:true
            }
            const res = await reqInstance.post(`http://localhost:4000/member/add-member/${roomId}`, data)

            // await addDoc(allRoomRef, room)
            setRoomName('')
            setRoomUrl('')
            alert('Created new room!')
            setOpenModal(false)
            dispatch(getAllRooms())

        } catch (err) {
            console.log(err)
        }


    }
    return (
        <div>
            <Dialog open={openModal} onClose={handleModalClose}>
                <DialogTitle>Create Room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create new room & have a fun group chat with peoples!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter room name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={roomName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter room icon"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={roomUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} >Cancel</Button>
                    <Button onClick={() => handleAddRoom(user.name as string, user.email as string, user.photoUrl as string)} >Create Room</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomModal