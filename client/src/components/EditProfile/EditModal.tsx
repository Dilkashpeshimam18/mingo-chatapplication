import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { User, updateProfile, getAuth } from 'firebase/auth';
import { authActions } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/slice/modalSlice';
import { RoomType } from '../../store/slice/roomSlice';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { getAllRooms } from '../../store/slice/roomSlice';
import { AppDispatch } from '../../store/store';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

type EditModalProps = {
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void
}

const EditModal = ({ openModal, setOpenModal }: EditModalProps) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const dispatch: AppDispatch = useDispatch()
    const auth = getAuth()
    const currentUser = auth.currentUser;
    const isOpen = useSelector((state: RootState) => state.modal.isOpen)
    const isEditRoom = useSelector((state: RootState) => state.modal.isEditRoom)
    const [data, setData] = useState<RoomType[]>([])
    const allRoom = useSelector((state: RootState) => state.room.allRoom)
    const isSelectedRoom = useSelector((state: RootState) => state.room.isSelectedRoom)
    const isRoom = useSelector((state: RootState) => state.room.isRoom)
    const [roomName, setRoomName] = useState<string | number>('')
    const [roomUrl, setRoomUrl] = useState('')
    const [roomId, setRoomId] = useState<string>('')
    const [allUser, setAllUser] = useState<[]>([])
    const isAddMem = useSelector((state: RootState) => state.modal.isAddMember)

    const handleModalClose = () => {
        setOpenModal(false)
        dispatch(modalActions.handleClose())
    }


    const handleEditProfile = async () => {
        try {

            let userDetail = {
                name: name,
                email: user.email,
                photoUrl: photoUrl,
                bio: bio,

            }
            dispatch(authActions.addUserDetail(userDetail))
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const res = await reqInstance.post('http://localhost:4000/user/edit-userprofile', userDetail)
            localStorage.setItem('userBio', bio as string)
            localStorage.setItem('userName', name as string)
            localStorage.setItem('userPhotoUrl', photoUrl as string)
            alert('Profile Updated!')
            handleModalClose()

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const handleEditRoom = async (id: string) => {
        try {
            let data = {
                roomName: roomName,
                roomUrl: roomUrl,
            }
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = reqInstance.put(`http://localhost:4000/room/edit-room/${id}`, data)
                .then((res) => {
                    alert('Room Update!')
                    dispatch(getAllRooms())
                    handleModalClose()
                })


        } catch (err) {
            console.log(err)
            alert('Something went wrong!')
        }
    }
    const getAllUser = async () => {
        try {
            
            const token = localStorage.getItem('userToken')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const res = await reqInstance.get('http://localhost:4000/user/get-alluser')
            console.log(res)
            const allUser = res.data.allUser
            setAllUser(allUser)
        } catch (err) {
            console.log(err)
        }
    }
    const emails = ['username@gmail.com', 'user02@gmail.com'];


    useEffect(() => {

        if (isRoom == true) {
            let selectedRoom = allRoom.filter((room) => {
                return room.roomName == isSelectedRoom
            })
            setData(selectedRoom)
            setRoomName(selectedRoom[0]?.roomName)
            setRoomUrl(selectedRoom[0]?.roomUrl)
            setRoomId(selectedRoom[0]?.id as string)
        }
    }, [isRoom, isSelectedRoom])

    useEffect(() => {
        if (isAddMem == true) {
            getAllUser()
        }
    }, [isAddMem])
    return (
        <div>
            <Dialog open={isOpen} onClose={handleModalClose}>
                {isAddMem == false ? (
                    isEditRoom == true ?

                        <>
                            <DialogTitle>Edit room </DialogTitle>

                            <DialogContent>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Room Name"
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
                                    label="Room Icon"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={roomUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomUrl(e.target.value)}

                                />   </DialogContent>
                            <DialogActions>
                                <Button onClick={handleModalClose} >Cancel</Button>
                                <Button onClick={() => handleEditRoom(roomId)} >Edit Room</Button>
                            </DialogActions>
                        </> :
                        <>
                            <DialogTitle>Edit Profile </DialogTitle>

                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Bio"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={bio}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}

                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Photo Url"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={photoUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhotoUrl(e.target.value)}

                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleModalClose} >Cancel</Button>
                                <Button onClick={handleEditProfile} >Edit Profile</Button>
                            </DialogActions>
                        </>

                ) : (

                    <>
                        <List sx={{ pt: 0 }}>
                            {allUser.map((user: object | any) => (
                                <ListItem disableGutters>
                                    <ListItemButton key={user.id}>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <AddIcon sx={{color:'white'}} />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.email} secondary={user.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        
                        </List>
                    </>

                )}

            </Dialog>
        </div>
    )
}

export default EditModal