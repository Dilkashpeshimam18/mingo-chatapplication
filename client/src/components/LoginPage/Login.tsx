import React, { useState, useEffect } from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store';
import { authActions } from '../../store/slice/authSlice';
const GroupChatImg = require("../assets/GroupChat3.gif");
const GoogleIcon = require("../assets/google.png")
const SmileyEmoji = require("../assets/smiling.png")

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    let userDetail = {
                        name: userCredential.user.displayName,
                        email: userCredential.user.email,
                        photoUrl: userCredential.user.photoURL,
                        bio: '',
                        uid: userCredential.user.uid

                    }
                    dispatch(authActions.addUserDetail(userDetail))
                    localStorage.setItem('userName', userCredential.user.displayName as string)
                    localStorage.setItem('userEmail', userCredential.user.email as string)
                    localStorage.setItem('userPhotoUrl', userCredential.user.photoURL as string)
                    localStorage.setItem('userUID', userCredential.user.uid as string)

                    setEmail('')
                    setPassword('')
                    navigate('/')
                })

        } catch (err) {
            console.log(err)
        }
    }
    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    navigate('/')
                })


        } catch (err) {
            console.log(err)
        }

    }
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
                        <form onSubmit={handleLogin} className='register-form'>

                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={handleEmail} required />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={handlePassword} required />

                            </div>

                            <div className='register-button__container'>
                                <button type='submit' className='register-button'>SIGN IN</button>
                            </div>
                            <Divider style={{ color: 'gray' }}>or</Divider>


                        </form>

                    </div>

                </div>

                <div className='register-option__2'>
                    <div style={{ marginTop: '25px' }} className='register-button__container'>
                        <button onClick={handleSignInWithGoogle} className='register-button__google'><img style={{ width: '20px', height: '20px', marginRight: '8px', marginTop: '5px' }} src={GoogleIcon} /><p>SIGN IN WITH GOOGLE</p></button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Login