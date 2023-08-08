import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { auth, provider } from '../../firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile, User, signInWithPopup } from 'firebase/auth'
import axios from 'axios';

const GroupChatImg = require("../assets/GroupChat.gif");
const GoogleIcon = require("../assets/google.png")


const Register = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [phoneNo, setPhoneNo] = useState<number | any>()

    const navigate = useNavigate()
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNo(e.target.value)
    }

    const updateUserProfile = async (user: User, name: string) => {
        await updateProfile((user), {
            displayName: name,
        })
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
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    console.log(userCredential)
                    await updateUserProfile(userCredential.user, name);
                    setName('')
                    setEmail('')
                    setPassword('')
                    alert('Signup Successful!')
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                })



        } catch (err) {
            console.log(err)
            alert(err)
        }

    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data={
                name,
                email,
                phoneNo,
                password
            }
            const res = await axios.post('http://localhost:4000/auth/sign-up',data)
            if(res.status==200){
                setName('')
                setEmail('')
                setPassword('')
                setPhoneNo(0)
                alert('Signup Successful!')
                navigate('/login')
            }

        } catch (err:any) {
            console.log(err)
            if(err.response.status==403){
                alert('User already exists, please login!')
            }else{
                alert('Something went wrong!')
            }
        }
    }
    return (
        <div className='register'>
            <div className='register-left'>
                <div className='img-container'>
                    <img className='register-image'  src={GroupChatImg} />

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
                        <form onSubmit={handleSignUp } className='register-form'>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleName} required />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Phone Number" type='number' variant="outlined" value={phoneNo} onChange={handleNumber} required />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={handleEmail} required />

                            </div>
                            <div className='form-input__container'>
                                <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={handlePassword} required />

                            </div>

                            <div className='register-button__container'>
                                <button type='submit' className='register-button'>SIGN UP</button>
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

export default Register