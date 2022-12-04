import React from 'react'
import './Profile.css'
import ProfileMain from './ProfileMain/ProfileMain';
import ProfileOptions from './ProfileOptions/ProfileOptions';
import ProfileMedia from './ProfileMedia/ProfileMedia';
import ProfileInput from './ProfileInput/ProfileInput';


const Profile = () => {
  return (
    <div className='profile'>
      <ProfileInput />
      <ProfileMain />
      <ProfileOptions />
      <ProfileMedia />

    </div>
  )
}

export default Profile