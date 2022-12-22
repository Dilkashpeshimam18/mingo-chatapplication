import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


type RoomModalProps = {
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void
}
type Groups = {
    id: number | string
    name: string | number
}
const RoomModal = ({ openModal, setOpenModal }: RoomModalProps) => {
    const [roomName, setRoomName] = useState<string | number>('')
    const [group, setGroup] = useState<Groups[]>([])

    const handleModalClose = () => {
        setOpenModal(false)
    }

    const handleCreateGroup = () => {
        group.map((group, ind) => ({ ...group, id: Math.random() }))
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
                        label="Enter group name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={roomName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} >Cancel</Button>
                    <Button >Create Room</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomModal