import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const GroupChatImg = require("../assets/GroupChat.gif");
const GoogleIcon = require("../assets/google.png")


const Register = () => {
    return (
        <div className='register'>
            <div className='register-left'>
                <div className='img-container'>
                    <img style={{ height: '680px', width: '680px' }} src={GroupChatImg} />

                </div>
            </div>
            <div className='register-right'>
                <div className='register-option__1'>
                    <p className='register-option__text'>Already have an account?</p>
                    <Link to='/login'>
                        <button className='register-option__button'>SIGN IN</button>

                    </Link>

                </div>
                <div className='register-main'>
                    <div className='title-container'>
                        <h1 className='title-text'>Welcome to Mingo!</h1>
                        <p className='subTitle__text'>Register your account</p>

                    </div>
                    <div className='form-container'>
                        <form className='register-form'>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Name" variant="outlined" />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" />

                            </div>

                            <div className='register-button__container'>
                                <button className='register-button'>SIGN UP</button>
                            </div>
                            <Divider style={{ color: 'gray' }}>or</Divider>
                            <div style={{ marginTop: '25px' }} className='register-button__container'>
                                <button className='register-button__google'><img style={{ width: '20px', height: '20px', marginRight: '8px', marginTop: '5px' }} src={GoogleIcon} /><p>SIGN IN WITH GOOGLE</p></button>
                            </div>


                        </form>

                    </div>

                </div>

                <div className='register-option__2'>

                </div>

            </div>

        </div>
    )
}

export default Register