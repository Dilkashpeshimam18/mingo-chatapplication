import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { roomActions } from '../../store/slice/roomSlice';

type JoinModalProps = {
    open: boolean,
    handleClose: () => void,
}
const JoinModal = ({ open, handleClose }: JoinModalProps) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to join this room?
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}  >Cancel</Button>
                    <Button onClick={() => {
                        dispatch(roomActions.handleJoinRoom())
                        handleClose()
                    }}  >Join</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default JoinModal