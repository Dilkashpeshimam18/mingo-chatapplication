import React from 'react'
import './Profile.css'
import ProfileMain from './ProfileMain/ProfileMain';
import ProfileOptions from './ProfileOptions/ProfileOptions';
import ProfileMedia from './ProfileMedia/ProfileMedia';
import ProfileInput from './ProfileInput/ProfileInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AllMembers from '../AllMembers/AllMembers';

const Profile = () => {
  const isView = useSelector((state: RootState) => state.member.isViewMember)
  return (
    <div className='profile'>
      <ProfileInput />
      {isView == true ? <AllMembers /> :
        <>
          <ProfileMain />
          <ProfileOptions />
          <ProfileMedia />
        </>

      }


    </div>
  )
}

export default Profile