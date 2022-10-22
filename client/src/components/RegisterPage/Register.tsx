import React from 'react'
import './Register.css'
// import GroupChatImg from '../assets/GroupChat.gif'
const GroupChatImg =  require("../assets/GroupChat.gif");

const Register = () => {
  return (
    <div className='register'>
        <div className='register-left'>
            <div className='img-container'>
            <img style={{height:'650px', width:'650px'}} src={GroupChatImg} />

            </div>
        </div>
        <div className='register-right'>

        </div>

    </div>
  )
}

export default Register