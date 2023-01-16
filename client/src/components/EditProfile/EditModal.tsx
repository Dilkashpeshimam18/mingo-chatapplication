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

type EditModalProps = {
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void
}
const EditModal = ({ openModal, setOpenModal }: EditModalProps) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const dispatch = useDispatch()
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
                uid: user.uid

            }
            dispatch(authActions.addUserDetail(userDetail))
            const response = await updateProfile(currentUser as User, {
                displayName: name,
                photoURL: photoUrl
            }).then((res) => {
                alert('Profile Updated!')
                setOpenModal(false)
            })

            localStorage.setItem('userBio', bio as string)
            localStorage.setItem('userName', name as string)
            localStorage.setItem('userPhotoUrl', photoUrl as string)

        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const handleEditRoom = () => {
        try {

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (isRoom == true) {
            let selectedRoom = allRoom.filter((room) => {
                return room.roomName == isSelectedRoom
            })
            setData(selectedRoom)
            setRoomName(selectedRoom[0]?.roomName)
            setRoomUrl(selectedRoom[0]?.roomUrl)
        }

    }, [isRoom, isSelectedRoom])
    return (
        <div>
            <Dialog open={isOpen} onClose={handleModalClose}>
                {isEditRoom == true ?

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
                    </>
                }
                <DialogActions>
                    <Button onClick={handleModalClose} >Cancel</Button>
                    <Button onClick={handleEditProfile} >Edit Profile</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditModal