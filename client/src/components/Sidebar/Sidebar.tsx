import React from 'react'
import './Sidebar.css'
import UserDetail from './UserDetail/UserDetail'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-userDetail'>
            <UserDetail />

        </div>
        </div>
  )
}

export default Sidebar