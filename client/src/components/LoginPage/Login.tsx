import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
const GroupChatImg = require("../assets/GroupChat3.gif");
const GoogleIcon = require("../assets/google.png")
const SmileyEmoji = require("../assets/smiling.png")

const Login = () => {
    return (
        <div className='register'>
            <div className='register-left'>
                <div className='img-container'>
                    <img style={{ height: '680px', width: '680px' }} src={GroupChatImg} />

                </div>
            </div>
            <div className='register-right'>
                <div className='register-option__1'>
                    <p className='register-option__text'>New to Mingo?</p>
                    <Link to='/register'>
                        <button className='register-option__button'>SIGN UP</button>

                    </Link>

                </div>
                <div className='register-main'>
                    <div className='title-container'>
                        <h1 className='title-text'>Hello!</h1>
                        <p className='subTitle__text'>Login to your mingo  account.<img style={{ height: '18px', width: '18px', marginLeft: '2px', }} src={SmileyEmoji} /></p>

                    </div>
                    <div className='form-container'>
                        <form className='register-form'>

                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" />

                            </div>

                            <div className='register-button__container'>
                                <Link to='/'> <button className='register-button'>SIGN IN</button></Link>
                            </div>
                            <Divider style={{ color: 'gray' }}>or</Divider>


                        </form>

                    </div>

                </div>

                <div className='register-option__2'>
                    <div style={{ marginTop: '25px' }} className='register-button__container'>
                        <button className='register-button__google'><img style={{ width: '20px', height: '20px', marginRight: '8px', marginTop: '5px' }} src={GoogleIcon} /><p>SIGN IN WITH GOOGLE</p></button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Login